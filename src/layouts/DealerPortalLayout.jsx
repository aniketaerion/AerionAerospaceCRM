// src/layouts/DealerPortalLayout.jsx

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

// Layout-specific components
import Header from '@/components/layout-specific/Header';
import Sidebar from "@/components/layout-specific/Sidebar";
import Footer from '@/components/layout-specific/Footer';

// Common UI components
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { DealerContext } from '@/contexts/DealerContext';

export default function DealerPortalLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <DealerContext.Provider value={{
      dealerName: 'Shakti Agro Drones',
      dealerCode: 'shakti001',
      dealerLogo: '/assets/dealers/shakti001.png'
    }}>
      {/* Main container for the entire portal layout */}
      <div className="flex flex-col min-h-screen font-inter bg-neutral-light">

        {/* Header component - MUST BE FIXED IN Header.tsx, and has a height like h-[80px] */}
        <Header onMenuToggle={toggleSidebar} />

        {/* Main Content Area: Flex container for Sidebar and the dynamic Page Content */}
        {/* pt-[80px] to push content below the fixed header */}
        <div className="flex flex-1 relative pt-[80px]">
          {/* Sidebar component - renders the navigation links */}
          {/* Sidebar is fixed and positioned top-[80px] left-0 w-64 */}
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          {/* Main Page Content area - where the actual module pages will render */}
          {/* md:ml-64 to push content right of the fixed sidebar on desktop */}
          <main className="flex-1 bg-white p-6 md:p-8 overflow-y-auto shadow-inner rounded-tl-lg rounded-tr-lg md:ml-64">
            <Breadcrumbs />
            <Outlet />
          </main>
        </div>

        {/* Footer component */}
        <Footer />
      </div>
    </DealerContext.Provider>
  );
}