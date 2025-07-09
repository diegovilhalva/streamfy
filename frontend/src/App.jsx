import { Navigate, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import OnBoarding from "./pages/OnBoarding"
import Notifications from "./pages/Notifications"
import Call from "./pages/Call"
import Chat from "./pages/Chat"
import { Toaster } from "react-hot-toast"
import PageLoader from "./components/PageLoader"
import useAuthUser from "./hooks/useAuthUser"

function App() {

  const { authUser, isLoading } = useAuthUser()

  const isAuthenticated = Boolean(authUser)

  const isOnboarded = authUser?.isOnboarded

  if (isLoading) return <PageLoader />;
  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? (<Home />) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/onboarding" element={isAuthenticated ? <OnBoarding /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={isAuthenticated ? <Notifications /> : <Navigate to="/login" />} />
        <Route path="/call" element={isAuthenticated ? <Call /> : <Navigate to="/login" />} />
        <Route path="/chat" element={isAuthenticated ? <Chat /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>

  )
}

export default App
