# Lumina - Stellar Philanthropic Platform (Level 2)

A professional, modern React/Next.js dashboard for **Lumina**, a Stellar-based philanthropic platform featuring multi-wallet integration, smart contracts, and real-time transaction tracking.

## Level 2 Requirements Met ✓

✅ **3 Error Types Handled:**
- `WalletError` - Wallet connection failures and rejections
- `InsufficientBalanceError` - Account balance validation errors  
- `ContractError` - Smart contract execution failures

✅ **Contract Deployed on Testnet:** Soroban donation contract deployed with real fundraising logic

✅ **Contract Called from Frontend:** Full integration via `ContractService` with donation transactions

✅ **Transaction Status Visible:** Real-time pending/success/failed tracking with transaction hashes and Stellar Explorer links

✅ **Meaningful Git Commits:** Implementation tracked across wallet integration, error handling, and contract deployment stages

## Features

### Multi-Wallet Integration
- **Freighter Wallet** - Primary Stellar wallet support
- **Albedo Wallet** - Alternative wallet option  
- Smooth connection flow with `@creit.tech/stellar-wallets-kit`
- Address display with truncation and copy functionality
- Automatic wallet modal on donation

### Smart Contract (Soroban)
- Grant creation and donation tracking
- Real-time fund progress monitoring
- Transaction verification on Stellar Explorer
- Testnet deployment ready

### Real-time Features
- Transaction status polling (pending → success/failed)
- Live donation updates on impact feed
- Event listener integration
- Contract state synchronization

### UI Components
- Impact Feed with grant cards
- Transaction status indicators (loading, success, error)
- Error notifications with error types
- Progress tracking with visual bars
- Chat drawer assistant

## Installation

### Prerequisites
- Node.js 18+ and pnpm
- Stellar Freighter or Albedo wallet browser extension
- Soroban CLI (for contract deployment)

### Setup

```bash
# Clone the repository
git clone https://github.com/tusharshi123/lumina-project.git
cd lumina-project

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_CONTRACT_ADDRESS=CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_STELLAR_NETWORK=testnet
```

## Development

```bash
# Run dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

## Smart Contract Deployment

### Build Contract

```bash
cd contract
soroban contract build
```

### Deploy to Testnet

```bash
soroban contract deploy \
  --network testnet \
  --source <YOUR_STELLAR_SECRET_KEY> \
  --wasm target/wasm32-unknown-unknown/release/lumina_contract.wasm
```

Copy the returned contract address to `.env.local` as `NEXT_PUBLIC_CONTRACT_ADDRESS`.

## Testing the Integration

### 1. Connect Wallet
- Click "Connect Wallet" button in navbar
- Select Freighter or Albedo
- Authorize the connection in wallet extension

### 2. Make a Donation
- View a grant in the Impact Feed
- Click "Donate 10 XLM" button
- Watch real-time transaction status:
  - 🔄 **Pending** - Transaction processing
  - ✓ **Success** - Funds received (shows tx hash)
  - ✗ **Failed** - Transaction error (shows reason)

### 3. Error Handling Examples
- **Wallet Error**: No wallet connected or connection rejected
- **Insufficient Balance**: Account balance < donation amount
- **Contract Error**: Contract execution failures

### 4. Verify on Stellar Explorer
- Visit: `https://stellar.expert/explorer/testnet/tx/[TRANSACTION_HASH]`

## Project Structure

```
lumina-project/
├── app/
│   ├── page.tsx                # Main dashboard
│   ├── layout.tsx              # Root layout with WalletProvider
│   └── globals.css             # Tailwind + design tokens
├── components/
│   ├── navbar.tsx              # Nav with Connect Wallet
│   ├── grant-card.tsx          # Grant card with donate + status
│   ├── impact-feed.tsx         # Grants list
│   ├── contract-explorer.tsx   # Ledger view
│   └── chat-drawer.tsx         # AI assistant
├── contexts/
│   └── wallet-context.tsx      # Wallet state management
├── services/
│   ├── contract-service.ts     # Contract calls & polling
│   ├── error-handler.ts        # Error handling (3 types)
│   └── transaction-tracker.ts  # TX status tracking
└── contract/
    └── src/lib.rs             # Soroban smart contract
```

## Git Commits

Track the implementation:
1. Initial dashboard UI setup
2. Multi-wallet integration with StellarWalletsKit
3. Error handling (WalletError, InsufficientBalanceError, ContractError)
4. Contract service and transaction polling
5. Smart contract deployment and testing

## Level 2 Deliverables

- ✓ **Public GitHub Repository**: [tusharshi123/lumina-project](https://github.com/tusharshi123/lumina-project)
- ✓ **README with Setup Instructions**: You are reading it!
- ✓ **Meaningful Commits**: 5+ implementation stages tracked
- ✓ **Live Demo**:https://lumina-project-nu.vercel.app
- ✓ **Screenshot**: Wallet connection options visible in navbar
- ✓ **Deployed Contract Address**:CBGH6NXDC3SY62IAIZARK6F3L52JDYRQUXTQNW7NKWGOI5MNJO2L67A5
- ✓ **Transaction Hash**: Verifiable on Stellar Explorer

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with design tokens
- **Wallets**: @creit.tech/stellar-wallets-kit, @stellar/freighter-api
- **Smart Contracts**: Soroban (Rust)
- **Blockchain**: Stellar Testnet
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Error Handling Examples

```typescript
// Wallet Connection Error
try {
  await contractService.callDonate(grantId, amount);
} catch (error) {
  if (error instanceof WalletError) {
    console.error("Please connect your wallet first");
  }
}

// Insufficient Balance Error
if (error instanceof InsufficientBalanceError) {
  console.error("Your balance is too low for this donation");
}

// Contract Execution Error
if (error instanceof ContractError) {
  console.error("Contract call failed:", error.message);
}
```

## Resources

- [Stellar Docs](https://developers.stellar.org)
- [Soroban Docs](https://soroban.stellar.org)
- [StellarWalletsKit](https://www.npmjs.com/package/@creit.tech/stellar-wallets-kit)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

## License

MIT

## Support

For questions, reach out to the [Stellar DevRel team](https://stellar.org/developers)
