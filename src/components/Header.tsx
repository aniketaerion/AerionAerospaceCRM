// src/components/Header.tsx
import { useDealer } from '@/contexts/DealerContext';

function Header() {
  const { dealerName, dealerLogo } = useDealer();
  return (
    <header className="bg-white border-b px-4 py-2 flex justify-between items-center shadow">
      <div className="flex items-center gap-4">
        <img src="/assets/aerion-logo.png" alt="Aerion Logo" className="h-8" />
        <img src={dealerLogo} alt="Dealer Logo" className="h-6" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">{dealerName}</span>
        <button className="text-sm text-gray-600">Help</button>
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">D</div>
      </div>
    </header>
  );
}

export default Header;
