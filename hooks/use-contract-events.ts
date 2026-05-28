'use client';

import { useEffect, useState, useRef } from 'react';

export interface ContractEvent {
  type: 'donation' | 'grant_created' | 'milestone_reached';
  grantId: number;
  amount?: number;
  donorAddress?: string;
  timestamp: number;
}

export function useContractEvents(grantId?: number) {
  const [events, setEvents] = useState<ContractEvent[]>([]);
  const eventSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // In production, connect to actual Soroban event stream
    // For now, simulate event listener with polling

    // Simulate receiving donation events
    const pollInterval = setInterval(() => {
      // Random chance of new donation event
      if (Math.random() > 0.7) {
        const newEvent: ContractEvent = {
          type: 'donation',
          grantId: grantId || Math.floor(Math.random() * 5) + 1,
          amount: Math.random() * 50 + 1,
          donorAddress: `G${Math.random().toString(36).substring(2, 50)}`,
          timestamp: Date.now(),
        };
        setEvents((prev) => [newEvent, ...prev].slice(0, 50)); // Keep last 50 events
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(pollInterval);
  }, [grantId]);

  const clearEvents = () => setEvents([]);

  return {
    events,
    clearEvents,
  };
}

// Real-time subscription for contract state changes
export function useContractStateListener(contractAddress: string) {
  const [isListening, setIsListening] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  useEffect(() => {
    setIsListening(true);

    // In production, subscribe to Soroban ledger events via:
    // - Soroban RPC `getLedgerEntries` with continuous polling
    // - WebSocket connection to event stream
    // - Stellar Core event subscription

    const checkInterval = setInterval(() => {
      setLastUpdate(Date.now());
    }, 30000); // Check every 30 seconds

    return () => {
      clearInterval(checkInterval);
      setIsListening(false);
    };
  }, [contractAddress]);

  return {
    isListening,
    lastUpdate,
  };
}
