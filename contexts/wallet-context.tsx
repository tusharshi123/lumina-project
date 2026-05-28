"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import {
  StellarWalletsKit,
  Networks,
} from "@creit.tech/stellar-wallets-kit";
import { FreighterModule } from "@creit.tech/stellar-wallets-kit/modules/freighter";
import { AlbedoModule } from "@creit.tech/stellar-wallets-kit/modules/albedo";
import { WalletError } from "@/services/error-handler";

interface WalletContextType {
  address: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  truncatedAddress: string | null;
  clearError: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      // Initialize the kit with static method
      StellarWalletsKit.init({
        network: Networks.TESTNET,
        selectedWalletId: "freighter",
        modules: [new FreighterModule(), new AlbedoModule()],
      });
      setIsInitialized(true);
    } catch (err) {
      console.error("[WalletProvider] Initialization error:", err);
      setError("Failed to initialize wallet. Please refresh the page.");
    }
  }, []);

  const connect = useCallback(async () => {
    if (!isInitialized) {
      setError("Wallet not ready. Please wait...");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const result = await StellarWalletsKit.authModal();
      
      if (!result || !result.address) {
        throw new WalletError("Wallet connection rejected or no address returned");
      }

      setAddress(result.address);
      setError(null);
    } catch (err: any) {
      const errorMessage = err instanceof WalletError 
        ? err.message 
        : err?.message || "Failed to connect wallet";
      
      console.error("[WalletProvider] Connection error:", err);
      setError(errorMessage);
      setAddress(null);
    } finally {
      setIsConnecting(false);
    }
  }, [isInitialized]);

  const disconnect = useCallback(() => {
    setAddress(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const truncatedAddress = address
    ? `${address.slice(0, 4)}...${address.slice(-4)}`
    : null;

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnecting,
        isConnected: !!address,
        error,
        connect,
        disconnect,
        truncatedAddress,
        clearError,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
