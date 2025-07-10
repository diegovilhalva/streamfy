import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useAuthUser from '../hooks/useAuthUser'
import { useQuery } from '@tanstack/react-query'
import { getStreamToken } from '../lib/api'
import { StreamChat } from "stream-chat"
import {
  Channel,
  ChannelHeader,
  Chat as ChatStr,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import toast from 'react-hot-toast'
import ChatLoader from '../components/ChatLoader'
import CallButton from '../components/CallButton'

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY
const Chat = () => {
  const { id: targetUserId } = useParams()
  const [chatClient, setChatClient] = useState(null)
  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(true)

  const { authUser } = useAuthUser()
  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  })

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY)

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        )

        const channelId = [authUser._id, targetUserId].sort().join("-")
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();
        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Erro ao iniciar chat:", error);
        toast.error("Não foi possível conectar ao chat. Tente novamente mais tarde.");
      } finally {
        setLoading(false)
      }
    }
    initChat()
  }, [tokenData, authUser, targetUserId])

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `Iniciei uma chamada de vídeo. Junte-se a mim aqui: ${callUrl}`,
      });

      toast.success("Link da chamada de vídeo enviado com sucesso!");
    }
  }

  if (loading || !chatClient || !channel) return <ChatLoader />
  return (
    <div className="h-[90vh] flex items-center justify-center bg-current px-2 py-4">
      <ChatStr client={chatClient} theme="messaging light">
        <Channel channel={channel}>
          <div className="relative w-full max-w-5xl rounded-lg shadow-xl overflow-auto bg-white">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
            <Thread />
          </div>
        </Channel>
      </ChatStr>
    </div>
  )
}

export default Chat