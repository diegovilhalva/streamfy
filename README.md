# Streamfy 🎥💬

[Live Demo](https://streamfy-k742.onrender.com) • [GitHub Repository](https://github.com/diegovilhalva/streamfy)

Streamfy is a real-time chat and video call platform that connects language learners from around the world. Users can register, configure their profiles based on the language they speak and the one they are learning, find friends with similar interests, and communicate through messages or video calls. The platform also offers full theming with 32 different visual styles.

## 🌐 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, DaisyUI  
- **Backend:** Node.js, Express, MongoDB  
- **Real-time Messaging & Video:** [Stream Chat API](https://getstream.io/chat/)  
- **Auth:** JWT & HTTP-only cookies  

---

## ✨ Features

- 🔐 **User Authentication**: Sign up, login, and logout with secure token-based auth
- 🌎 **Onboarding System**: Select native language and language you're learning
- 🧠 **Friend Suggestions**: Get user recommendations based on language preferences
- 🤝 **Friend Requests**: Send, accept, and manage friend requests
- 💬 **Real-Time Messaging**: Chat instantly with accepted friends
- 📹 **Video Calls**: Start 1:1 video calls through Stream’s powerful APIs
- 🎨 **Theme Customization**: Choose from **32 themes** using DaisyUI
- 🧭 **Responsive UI**: Fully responsive design with modern UX

---

## 🌍 Language

This project is developed in **Portuguese** (Brazil).

---

## ⚙️ Environment Variables

### Backend (`/backend/.env`)
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
JWT_SECRET=your_jwt_secret
````

### Frontend (`/frontend/.env`)

```env
VITE_STREAM_API_KEY=your_stream_api_key
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/diegovilhalva/streamfy
cd streamfy
```

### 2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Add your environment variables

Create `.env` files in `/backend` and `/frontend` using the format above.

### 4. Run locally

```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev
```

---

## 📁 Project Structure

```
streamfy/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── ...
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── ...
```

---



## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Made with ❤️ by [Diego Vilhalva](https://github.com/diegovilhalva)


