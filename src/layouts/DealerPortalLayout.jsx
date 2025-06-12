// src/layouts/DealerPortalLayout.tsx
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DealerContext } from '@/contexts/DealerContext';

export default function DealerPortalLayout({ children }) {
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
          <main className="flex-1 bg-gray-50 p-4 overflow-y-auto">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </DealerContext.Provider>
  );
}
