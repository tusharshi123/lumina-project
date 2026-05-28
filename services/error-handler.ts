'use client';

// Error types for Level 2 requirements
export class WalletError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WalletError';
  }
}

export class InsufficientBalanceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InsufficientBalanceError';
  }
}

export class ContractError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContractError';
  }
}

export class TransactionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TransactionError';
  }
}

// Error handler utility
export const handleStellarError = (error: unknown): { type: string; message: string } => {
  if (error instanceof WalletError) {
    return { type: 'wallet', message: error.message };
  }
  if (error instanceof InsufficientBalanceError) {
    return { type: 'balance', message: error.message };
  }
  if (error instanceof ContractError) {
    return { type: 'contract', message: error.message };
  }
  if (error instanceof TransactionError) {
    return { type: 'transaction', message: error.message };
  }

  const err = error as any;
  if (err?.response?.status === 404) {
    return { type: 'wallet', message: 'Wallet not found' };
  }
  if (err?.message?.includes('Insufficient')) {
    return { type: 'balance', message: 'Insufficient balance for this transaction' };
  }
  if (err?.message?.includes('contract') || err?.message?.includes('Contract')) {
    return { type: 'contract', message: err.message || 'Contract execution failed' };
  }

  return {
    type: 'unknown',
    message: error instanceof Error ? error.message : 'An unknown error occurred',
  };
};
