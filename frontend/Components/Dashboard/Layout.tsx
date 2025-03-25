import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar - Fixed Left */}
      <div className="w-[250px] hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="bg-gray-100 flex-1 flex flex-col md:mt-2">
        {/* Navbar - Fixed Top */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:mt-2">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
