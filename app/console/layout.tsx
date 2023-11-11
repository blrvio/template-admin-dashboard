import Sidebar from "@/components/Sidebar/MainSidebar";
import { MainNavbar } from "@/components/Navbar/MainNavbar";
import ProtectRoute from "@/components/ProtectRoute";

export default function AdminLayout({ children }) {
  return (
    <>
      <ProtectRoute>
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <Sidebar />

          {/* Conteúdo principal + Navbar */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navbar */}
            <MainNavbar />

            {/* Conteúdo da página */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
              <div className="container mx-auto px-6 py-8">{children}</div>
            </main>
          </div>
        </div>
      </ProtectRoute>
    </>
  );
}
