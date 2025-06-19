import React, { useState } from 'react'; // Import useState for mobile sidebar state
import Header from '@/components/layout-specific/Header';
import Sidebar from "@/components/layout-specific/Sidebar"; 
import Footer from '@/components/layout-specific/Footer';
import Breadcrumbs from '@/components/common/Breadcrumbs'; // Import the new Breadcrumbs component
import { DealerContext } from '@/contexts/DealerContext';
import { Outlet } from 'react-router-dom';

export default function DealerPortalLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <DealerContext.Provider value={{
      dealerName: 'Shakti Agro Drones', // This data is provided to children via context
      dealerCode: 'shakti001',
      dealerLogo: '/assets/dealers/shakti001.png' // Ensure this path is correct if used in Header
    }}>
      <div className="flex flex-col min-h-screen font-inter bg-neutral-light"> {/* Using neutral-light for overall background */}
        {/* Header - Pass toggleSidebar for mobile menu button */}
        <Header onMenuToggle={toggleSidebar} />

        {/* Main Content Area: Flex container for Sidebar and Page Content */}
        <div className="flex flex-1 relative"> {/* Added relative for mobile sidebar positioning */}
          {/* Sidebar - Pass isOpen and onClose for mobile responsiveness */}
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          {/* Main Page Content */}
          <main className="flex-1 bg-white p-6 md:p-8 overflow-y-auto shadow-inner rounded-tl-lg rounded-tr-lg"> {/* Main content area white background, slight shadow */}
            <Breadcrumbs /> {/* Place Breadcrumbs prominently at the top of content */}
            <Outlet /> {/* Nested routes render here */}
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </DealerContext.Provider>
  );
}
