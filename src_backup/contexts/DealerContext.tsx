// src/contexts/DealerContext.tsx
import { createContext, useContext } from 'react';

interface DealerContextType {
  dealerName: string;
  dealerCode: string;
  dealerLogo: string;
}

const defaultDealerContext: DealerContextType = {
  dealerName: 'Your Dealership Name',
  dealerCode: 'dealer001',
  dealerLogo: '/assets/dealers/dealer001.png',
};

export const DealerContext = createContext<DealerContextType | undefined>(undefined);

export const useDealer = (): DealerContextType => {
  const context = useContext(DealerContext);
  if (!context) {
    throw new Error('useDealer must be used within a DealerContext.Provider');
  }
  return context;
};

export const defaultDealerContextValue = defaultDealerContext;
