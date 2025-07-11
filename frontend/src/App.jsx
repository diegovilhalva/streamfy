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
import Layout from "./components/Layout"
import { useThemeStore } from "./store/useThemeStore"
import Friends from "./pages/Friends"

function App() {

  const { authUser, isLoading } = useAuthUser()
  const { theme } = useThemeStore()

  const isAuthenticated = Boolean(authUser)

  const isOnboarded = authUser?.isOnboarded

  if (isLoading) return <PageLoader />;
  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar>
            <Home />
          </Layout>
        ) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/onboarding" element={isAuthenticated ? <OnBoarding /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar>
            <Notifications />
          </Layout>) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )} />
        <Route path="/call/:id" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={false}>
              <Call/>
          </Layout>
        ):(<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />
         <Route path="/chat/:id" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={false}>
              <Chat/>
          </Layout>
        ):(<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />
        <Route path="/friends" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar>
              <Friends />
          </Layout>
        ):(<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />
      </Routes>
      <Toaster />
    </div>

  )
}

export default App
