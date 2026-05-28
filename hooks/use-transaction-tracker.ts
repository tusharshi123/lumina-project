'use client';

import { useEffect, useState, useCallback } from 'react';
import { transactionTracker, Transaction } from '@/services/transaction-tracker';

export function useTransactionTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Initial load
    setTransactions(transactionTracker.getAllTransactions());

    // Subscribe to updates
    const unsubscribe = transactionTracker.subscribe((tx) => {
      setTransactions((prev) => {
        const updated = prev.filter((t) => t.id !== tx.id);
        return [tx, ...updated].sort((a, b) => b.createdAt - a.createdAt);
      });
    });

    return unsubscribe;
  }, []);

  const getTransactionsByGrant = useCallback(
    (grantId: number) => transactionTracker.getTransactionsByGrant(grantId),
    []
  );

  const getTransactionsByWallet = useCallback(
    (wallet: string) => transactionTracker.getTransactionsByWallet(wallet),
    []
  );

  return {
    transactions,
    getTransactionsByGrant,
    getTransactionsByWallet,
  };
}
