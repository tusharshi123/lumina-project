'use client';

import { StellarWalletsKit, Networks } from '@creit.tech/stellar-wallets-kit';
import { nativeToScVal, xdr, TransactionBuilder, BASE_FEE, Networks as StellarNetworks } from '@stellar/js-sdk';
import {
  ContractError,
  InsufficientBalanceError,
  WalletError,
  TransactionError,
} from './error-handler';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
const STELLAR_NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';

export interface TransactionStatus {
  id: string;
  status: 'pending' | 'success' | 'failed';
  hash?: string;
  error?: string;
  timestamp: number;
}

export interface GrantData {
  id: number;
  title: string;
  goal: number;
  raised: number;
  owner: string;
}

class ContractService {
  private kit: StellarWalletsKit | null = null;
  private transactions: Map<string, TransactionStatus> = new Map();

  async initialize(): Promise<void> {
    try {
      const FreighterModule = await import('@creit.tech/stellar-wallets-kit/freighter').then(
        (m) => m.FreighterModule
      );
      const AlbedoModule = await import('@creit.tech/stellar-wallets-kit/albedo').then(
        (m) => m.AlbedoModule
      );

      this.kit = StellarWalletsKit.init({
        network: Networks.TESTNET,
        modules: [new FreighterModule(), new AlbedoModule()],
      });
    } catch (error) {
      throw new ContractError('Failed to initialize contract service');
    }
  }

  async callDonate(grantId: number, amount: number): Promise<TransactionStatus> {
    if (!this.kit) {
      throw new WalletError('Contract service not initialized');
    }

    try {
      const address = await StellarWalletsKit.authModal();
      if (!address) {
        throw new WalletError('Wallet connection rejected');
      }

      // Check balance
      const balance = await this.checkBalance(address);
      if (balance < amount) {
        throw new InsufficientBalanceError(
          `Insufficient balance. Available: ${balance} XLM, Required: ${amount} XLM`
        );
      }

      // Create transaction
      const txId = Math.random().toString(36).substring(7);
      const status: TransactionStatus = {
        id: txId,
        status: 'pending',
        timestamp: Date.now(),
      };

      this.transactions.set(txId, status);

      // Simulate contract call - in production, you'd use Soroban RPC
      setTimeout(() => {
        const txHash = `${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`;
        const updatedStatus: TransactionStatus = {
          ...status,
          status: 'success',
          hash: txHash,
          timestamp: Date.now(),
        };
        this.transactions.set(txId, updatedStatus);
      }, 3000);

      return status;
    } catch (error: any) {
      const txId = Math.random().toString(36).substring(7);
      const errorStatus: TransactionStatus = {
        id: txId,
        status: 'failed',
        error: error.message,
        timestamp: Date.now(),
      };
      this.transactions.set(txId, errorStatus);
      throw error;
    }
  }

  async checkBalance(address: string): Promise<number> {
    try {
      // In production, fetch from Stellar Horizon API
      // For now, return mock balance
      return 1000; // Mock: 1000 XLM
    } catch (error) {
      throw new InsufficientBalanceError('Failed to check account balance');
    }
  }

  async getContractGrants(): Promise<GrantData[]> {
    // Mock data - in production, call contract via Soroban RPC
    return [
      {
        id: 1,
        title: 'Education Fund',
        goal: 100,
        raised: 45.5,
        owner: 'GXXXX...',
      },
      {
        id: 2,
        title: 'Healthcare Initiative',
        goal: 200,
        raised: 120.3,
        owner: 'GYYYY...',
      },
    ];
  }

  getTransaction(txId: string): TransactionStatus | undefined {
    return this.transactions.get(txId);
  }

  getAllTransactions(): TransactionStatus[] {
    return Array.from(this.transactions.values());
  }
}

export const contractService = new ContractService();
