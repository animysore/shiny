import { WalletConnection } from 'near-api-js';
import * as React from 'react';
import { useEffect, useState, createContext, useContext } from "react"
import { Contract } from '../models/Contract';
import { initContract } from "./utils"

const nearContext = createContext<{
  contract: Contract | null;
  accountId: string | null;
  walletConnection: WalletConnection | null;
  login: () => void;
  logout: () => void;
  loading: boolean;
}>({
  contract: null,
  accountId: null,
  walletConnection: null,
  login: () => { },
  logout: () => { },
  loading: true
});

// Dynamic Wrapper component which adds NEAR sdk to window and makes ...
// ... available to any child component that calls useNEAR().
export const WithNear = ({ children }: { children: React.ReactNode }) => {
  const near = useProvideNEAR();
  return <nearContext.Provider value={near}>{children}</nearContext.Provider>;
}

// Hook for child components to get the NEAR object ...
// ... and re-render when it changes.
export const useNEAR = () => {
  return useContext(nearContext);
};

// Provider hook that creates NEAR sdk and handles state
function useProvideNEAR() {
  const [loading, setLoading] = useState(true);
  const [contract, setContract] = useState<Contract | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [walletConnection, setWalletConnection] = useState<WalletConnection | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      initContract().then(({ walletConnection, contract, accountId }) => {
        setLoading(false);
        setContract(contract);
        setAccountId(accountId || null);
        setWalletConnection(walletConnection);
      })
    }
  }, [true]);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.

  const login = () => {
    if (contract && walletConnection) {
      walletConnection.requestSignIn(contract.contractId)
    }
  };
  
  const logout = () => {
    if (contract && walletConnection) {
      walletConnection.signOut()
      setAccountId(null);
    }
  };

  // Return the near objects and auth methods
  return {
    contract, accountId, login, logout, walletConnection, loading
  };
}
