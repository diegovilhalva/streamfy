import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import OnBoarding from "./pages/OnBoarding"
import Notifications from "./pages/Notifications"
import Call from "./pages/Call"
import Chat from "./pages/Chat"


function App() {


  return (
    <div className="h-screen ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/call" element={<Call />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>

  )
}

export default App
