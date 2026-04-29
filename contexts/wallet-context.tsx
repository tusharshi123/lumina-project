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
  WalletNetwork,
  allowAllModules,
} from "@creit.tech/stellar-wallets-kit";

interface WalletContextType {
  address: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  truncatedAddress: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [kit, setKit] = useState<StellarWalletsKit | null>(null);

  useEffect(() => {
    const stellarKit = new StellarWalletsKit({
      network: WalletNetwork.TESTNET,
      selectedWalletId: "freighter",
      modules: allowAllModules(),
    });
    setKit(stellarKit);
  }, []);

  const connect = useCallback(async () => {
    if (!kit) return;

    setIsConnecting(true);
    try {
      await kit.openModal({
        onWalletSelected: async (option) => {
          kit.setWallet(option.id);
          const { address: walletAddress } = await kit.getAddress();
          setAddress(walletAddress);
        },
      });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  }, [kit]);

  const disconnect = useCallback(() => {
    setAddress(null);
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
        connect,
        disconnect,
        truncatedAddress,
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
