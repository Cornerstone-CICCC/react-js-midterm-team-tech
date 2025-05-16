import Header from "./Header";
import { Outlet } from "react-router-dom";



const MainLayout = () => {
  return (
 <div className="relative min-h-screen overflow-hidden bg-pink-50">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-200 opacity-20 rounded-full blur-2xl animate-ping" />
      </div>

      <Header />

      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout