import { useThemeStore } from "../store/useThemeStore"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"


const Layout = ({children,showSidebar = false}) => {
  const {theme} = useThemeStore()
  return (

    <div className="min-h-screen" data-theme={theme}>
        <div className="flex">
          { showSidebar &&  <Sidebar />}
          <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 overflow-y-auto" >
                    {children}
                </main>
          </div>
        </div>
    </div>
  )
}

export default Layout