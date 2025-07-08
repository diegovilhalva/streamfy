import User from "../models/User.js"
import FriendRequest from "../models/FriendRequest.js"

export const getRecommendedUsers = async (req, res) => {
    try {
        const currentUserId = req.user.id
        const currentUser = req.user

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },
                { _id: { $nin: currentUser.friends } },
                { isOnboarded: true },
            ],
        })

        res.status(200).json({ success: true, recommendedUsers })
    } catch (error) {
        console.error("Erro ao carregar usuários recomendados:", error)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}


export const getMyFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("friends")
            .populate("friends", "fullName profilePic nativeLanguage learningLanguage")

        const friends = user.friends
        res.status(200).json({ success: true, friends })
    } catch (error) {
        console.error("Erro ao carregar amigos:", error)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}


export const sendFriendRequest = async (req, res) => {
    try {
        const myId = req.user.id;
        const { id: recipientId } = req.params

        if (myId === recipientId) {
            return res.status(400).json({ success: false, message: "Você não pode mandar solicitação para si mesmo" });
        }

        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ success: false, message: "Usuário não encontrado" });
        }

        if (recipient.friends.includes(myId)) {
            return res.status(400).json({ success: false, message: "Você já é amigo deste usuário" });
        }

        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId },
            ],
        });

        if (existingRequest) {
            return res
                .status(400)
                .json({ success: false, message: "Solicitação de amizade já enviada" });
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });

        res.status(201).json({ success: true, friendRequest });
    } catch (error) {
        console.error("Erro ao enviar solicitação:", error)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}


export const acceptFriendRequest = async (req, res) => {
    try {
        const { id: requestId } = req.params

        const friendRequest = await FriendRequest.findById(requestId)

        if (!friendRequest) {
            return res.status(404).json({ success: true, message: "Solicitação de amizade não encontrada" });
        }

        if (friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Solicitação de amizade não autorizada" });
        }

        friendRequest.status = "accepted";
        await friendRequest.save()

        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient },
        })

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender },
        })

        res.status(200).json({ success: true, message: "Solicitação de amizade aceita" })


    } catch (error) {
        console.error("Erro ao enviar solicitação:", error)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}


export const getFriendRequests = async (req, res) => {
    try {
        const incomingReqs = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending",
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

        const acceptedReqs = await FriendRequest.find({
            sender: req.user.id,
            status: "accepted",
        }).populate("recipient", "fullName profilePic");

        res.status(200).json({ sucess: true, incomingReqs, acceptedReqs });
    } catch (error) {
        console.error("Erro ao carregar solicitações:", error)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}


export const getOutgoingFriendReqs = async (req, res) => {
    try {
        const outgoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status: "pending",
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json({ success: true, outgoingRequests })
    } catch (error) {
        console.error("Erro ao carregar solicitações:", error)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}