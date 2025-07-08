import { Navigate, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import OnBoarding from "./pages/OnBoarding"
import Notifications from "./pages/Notifications"
import Call from "./pages/Call"
import Chat from "./pages/Chat"
import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "./lib/axios"

function App() {

  const { data:authData,isLoading,error} = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me")
      return res.data
    },
    retry:false
  })


  const authUser =  authData?.user


  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={ authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/"/>} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/onboarding" element={authUser ? <OnBoarding /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={ authUser ?<Notifications />: <Navigate to="/login"/>} />
        <Route path="/call" element={authUser ? <Call /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authUser  ? <Chat /> : <Navigate to="/login"/>} />
      </Routes>
      <Toaster />
    </div>

  )
}

export default App
