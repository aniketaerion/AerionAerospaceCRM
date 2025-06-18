import  Sidebar  from '@/components/Sidebar'; // only if Sidebar is a named export
import Header from '@/components/Header';       // <-- changed to default import
import Footer from '@/components/Footer';
import { DealerContext } from '@/contexts/DealerContext';
import { Outlet } from 'react-router-dom'; // Required for nested routes

export default function DealerPortalLayout() {
  return (
    <DealerContext.Provider value={{
      dealerName: 'Shakti Agro Drones',
      dealerCode: 'shakti001',
      dealerLogo: '/assets/dealers/shakti001.png'
    }}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
            <Outlet /> {/* Nested routes render here */}
          </main>
        </div>
        <Footer />
      </div>
    </DealerContext.Provider>
  );
}
