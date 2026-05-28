'use client';

import { TransactionStatus } from './contract-service';

export interface Transaction {
  id: string;
  type: 'donate' | 'withdraw';
  grantId: number;
  amount: number;
  wallet: string;
  status: 'pending' | 'success' | 'failed';
  hash?: string;
  error?: string;
  createdAt: number;
  completedAt?: number;
}

class TransactionTracker {
  private transactions: Map<string, Transaction> = new Map();
  private listeners: Set<(tx: Transaction) => void> = new Set();

  addTransaction(tx: Transaction): void {
    this.transactions.set(tx.id, tx);
    this.notifyListeners(tx);
  }

  updateTransaction(txId: string, updates: Partial<Transaction>): void {
    const existing = this.transactions.get(txId);
    if (existing) {
      const updated = { ...existing, ...updates };
      this.transactions.set(txId, updated);
      this.notifyListeners(updated);
    }
  }

  getTransaction(txId: string): Transaction | undefined {
    return this.transactions.get(txId);
  }

  getAllTransactions(): Transaction[] {
    return Array.from(this.transactions.values()).sort(
      (a, b) => b.createdAt - a.createdAt
    );
  }

  getTransactionsByGrant(grantId: number): Transaction[] {
    return this.getAllTransactions().filter((tx) => tx.grantId === grantId);
  }

  getTransactionsByWallet(wallet: string): Transaction[] {
    return this.getAllTransactions().filter((tx) => tx.wallet === wallet);
  }

  subscribe(listener: (tx: Transaction) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(tx: Transaction): void {
    this.listeners.forEach((listener) => listener(tx));
  }

  clearTransactions(): void {
    this.transactions.clear();
  }
}

export const transactionTracker = new TransactionTracker();
