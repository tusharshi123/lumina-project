# Level 2 Step-by-Step Completion Guide for Lumina

## Step 1: Deploy Smart Contract to Stellar Testnet

### 1.1 Install Soroban CLI
```bash
# On macOS with Homebrew
brew install stellar/stable/soroban-cli

# On Ubuntu/Linux
wget https://github.com/stellar/rs-soroban-cli/releases/download/v21.0.0/soroban-cli-21.0.0-x86_64-unknown-linux-gnu.tar.gz
tar xzf soroban-cli-21.0.0-x86_64-unknown-linux-gnu.tar.gz
sudo mv soroban /usr/local/bin/

# Verify installation
soroban --version
```

### 1.2 Create a Testnet Account
```bash
# Generate a new keypair (save this somewhere safe!)
soroban keys generate --name lumina-deployer

# Get your public address
soroban keys address lumina-deployer

# Fund your account with testnet XLM
# Visit: https://developers.stellar.org/docs/more/testnet-details#get-testnet-lumens
# Select "Generate" and enter your public address
```

### 1.3 Build the Contract
```bash
cd /vercel/share/v0-project/contract

# Build the Rust contract to WebAssembly
soroban contract build

# You should see:
# Compiling soroban-sdk...
# Finished release [optimized] target(s)
# The .wasm file is at: target/wasm32-unknown-unknown/release/lumina_contract.wasm
```

### 1.4 Deploy to Testnet
```bash
# Deploy the contract
soroban contract deploy \
  --network testnet \
  --source lumina-deployer \
  --wasm target/wasm32-unknown-unknown/release/lumina_contract.wasm

# Output will look like:
# Contract ID: CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4PNQA
# ✓ Transaction confirmed
```

### 1.5 Save Your Contract Address
```
✅ Contract Address (copy this - you'll need it next):
CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4PNQA
```

---

## Step 2: Add Contract Address to Environment

### 2.1 Copy Environment Template
```bash
cd /vercel/share/v0-project

# Copy the example file
cp .env.example .env.local
```

### 2.2 Edit .env.local
```bash
# Open .env.local in your editor and update with your contract:

NEXT_PUBLIC_CONTRACT_ADDRESS=CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4PNQA
NEXT_PUBLIC_STELLAR_NETWORK=testnet
```

### 2.3 Verify Environment
```bash
# Check that .env.local is created and contains your contract
cat .env.local

# Output should show:
# NEXT_PUBLIC_CONTRACT_ADDRESS=C...
# NEXT_PUBLIC_STELLAR_NETWORK=testnet
```

---

## Step 3: Test Locally

### 3.1 Start Dev Server
```bash
cd /vercel/share/v0-project

# Install dependencies (if not already done)
pnpm install

# Start the development server
pnpm dev

# You should see:
# ▲ Next.js 15.0.0
# - Local: http://localhost:3000
# - Environments: .env.local
```

### 3.2 Open Dashboard
```
Open http://localhost:3000 in your browser
```

### 3.3 Test Wallet Connection
```
Steps:
1. Click "Connect Wallet" button in top-right navbar
2. You should see a modal with wallet options:
   ✓ Freighter
   ✓ Albedo
3. Click "Freighter" (if you have the extension)
4. Accept the connection in your browser extension
5. You should see your address (e.g., G...xxxx) in the navbar
```

**Screenshot 1: Take a screenshot of the wallet connection modal**

### 3.4 Test Donation Flow
```
Steps:
1. Look at any grant in the Impact Feed
2. Click the "Donate 10 XLM" button
3. Approve the transaction in Freighter extension
4. Watch the status update:
   - 🔄 First: "Transaction Pending..."
   - ✓ Then: "Donation Received!" (with green checkmark)
   - Shows: "Hash: TX0000..." (transaction hash)
5. Wait for success state (30 seconds max)
```

**Screenshot 2: Take a screenshot of the successful donation with transaction hash visible**

### 3.5 Test Error Handling
```
Steps to trigger WalletError:
1. Disconnect your wallet (click navbar address → "Disconnect")
2. Try to donate
3. You should see red error: "WALLEterrror: Please connect your wallet first"

Steps to trigger InsufficientBalanceError:
1. (Only if you have very low balance - can skip for now)

Steps to trigger ContractError:
1. This happens during contract execution
2. Watch the error messages in the UI
```

**Screenshot 3: Take a screenshot of an error state**

### 3.6 Record Transaction Hash
```
From your successful donation:
Transaction Hash: TX_________________________

Save this - you'll need it for submission!

View on Stellar Explorer:
https://stellar.expert/explorer/testnet/tx/TX_________________________
```

---

## Step 4: Create Git Commits

### 4.1 Check Changes
```bash
cd /vercel/share/v0-project

# See all files that changed
git status

# You should see multiple new files:
# - services/contract-service.ts
# - services/error-handler.ts
# - services/transaction-tracker.ts
# - hooks/use-transaction-tracker.ts
# - hooks/use-contract-events.ts
# - contexts/wallet-context.tsx (modified)
# - components/grant-card.tsx (modified)
# - components/impact-feed.tsx (modified)
# - contract/src/lib.rs
# - .env.example
# + more documentation files
```

### 4.2 Create Commit 1: Smart Contract
```bash
# Stage contract files
git add contract/src/lib.rs
git add .env.example

# Commit
git commit -m "feat: Add Soroban smart contract for donations

- Implement donation tracking contract
- Support multiple grants with fund tracking
- Add donation function with error handling
- Include balance checking logic
- Contract ready for deployment to testnet"
```

### 4.3 Create Commit 2: Error Handling
```bash
# Stage error handling files
git add services/error-handler.ts
git add components/error-boundary.tsx

# Commit
git commit -m "feat: Implement 3-tier error handling system

- Add WalletError for connection failures
- Add InsufficientBalanceError for balance validation
- Add ContractError for contract execution failures
- Create error boundary component for UI
- Add user-friendly error messages and notifications"
```

### 4.4 Create Commit 3: Contract Service
```bash
# Stage service files
git add services/contract-service.ts
git add services/transaction-tracker.ts

# Commit
git commit -m "feat: Add contract interaction service

- Implement contract call interface
- Add transaction polling and status tracking
- Support donate, balance, and state queries
- Integrate transaction status updates
- Add real-time transaction monitoring"
```

### 4.5 Create Commit 4: Real-time Features
```bash
# Stage hooks
git add hooks/use-transaction-tracker.ts
git add hooks/use-contract-events.ts

# Commit
git commit -m "feat: Add real-time event listeners

- Create transaction tracker hook
- Implement contract event listener
- Add live donation updates
- Support event polling and filtering
- Enable real-time stats synchronization"
```

### 4.6 Create Commit 5: UI Integration
```bash
# Stage UI files
git add components/grant-card.tsx
git add components/impact-feed.tsx
git add contexts/wallet-context.tsx

# Commit
git commit -m "feat: Integrate contract calls into UI

- Add donate button with transaction handling
- Show real-time transaction status (pending/success/failed)
- Display transaction hashes on success
- Show error messages with error types
- Update impact feed with live donation stats
- Enhance wallet context with error handling"
```

### 4.7 Create Commit 6: Documentation
```bash
# Stage docs
git add README.md
git add CONTRACT_DEPLOYMENT.md
git add COMMITS.md
git add LEVEL2_CHECKLIST.md

# Commit
git commit -m "docs: Add comprehensive Level 2 documentation

- Add setup instructions to README
- Create deployment guide for Soroban
- Document commit message patterns
- Add Level 2 completion checklist
- Include testing and submission guidelines"
```

### 4.8 Verify All Commits
```bash
# See your commit history
git log --oneline -10

# Should show all 6 commits at the top
```

---

## Step 5: Gather Submission Materials

### 5.1 Collect Screenshots

**Screenshot 1: Wallet Connection Modal**
```
How to take:
1. Open http://localhost:3000
2. Click "Connect Wallet" button
3. Take screenshot showing modal with wallet options
File: screenshot-1-wallet-modal.png
```

**Screenshot 2: Successful Donation**
```
How to take:
1. Connect wallet first
2. Click "Donate 10 XLM" on any grant
3. Approve transaction in Freighter
4. Wait for success state (30 seconds)
5. Take screenshot showing:
   ✓ "Donation Received!" message
   ✓ Transaction hash (Hash: 0x...)
File: screenshot-2-donation-success.png
```

**Screenshot 3: Error State**
```
How to take:
1. Disconnect wallet
2. Try to donate
3. Take screenshot showing error message
File: screenshot-3-error-handling.png
```

### 5.2 Record Important Information

Create a file `SUBMISSION_DETAILS.txt`:

```
=== LUMINA LEVEL 2 SUBMISSION ===

Project: Lumina - Stellar Philanthropic Platform
Level: 2

--- GITHUB REPOSITORY ---
URL: https://github.com/tusharshi123/lumina-project
Branch: v0/tusharshinde042006-4570-3393300d

--- DEPLOYED CONTRACT ---
Network: Stellar Testnet
Contract Address: CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4PNQA
Status: ✓ Deployed and Verified

--- TEST TRANSACTION ---
Transaction Hash: TX_________________________
Status: ✓ Success
Explorer Link: https://stellar.expert/explorer/testnet/tx/TX_________________________
Amount: 10 XLM
Grant: [Which grant did you donate to?]

--- ERROR TYPES IMPLEMENTED ---
1. WalletError - Handles wallet connection failures
2. InsufficientBalanceError - Validates account balance
3. ContractError - Handles contract execution failures

--- FEATURES ---
✓ Multi-wallet support (Freighter, Albedo)
✓ Smart contract deployment to testnet
✓ Real-time transaction tracking
✓ Event listeners for live updates
✓ Error handling with 3 error types
✓ Transaction status indicators (pending/success/failed)
✓ Git commits with meaningful messages

--- TESTING CHECKLIST ---
✓ Wallet connection works
✓ Donation flow completes
✓ Transaction hash visible
✓ Error messages display correctly
✓ Contract calls succeed
✓ All commits created with meaningful messages
```

---

## Step 6: Deploy to Vercel (Optional but Recommended)

### 6.1 Push to GitHub
```bash
cd /vercel/share/v0-project

# Add all files
git add .

# Create final commit
git commit -m "chore: Level 2 ready for submission

All requirements completed:
- Smart contract deployed to testnet
- Error handling (3 types) implemented
- Transaction tracking with real-time updates
- Multi-wallet integration working
- Comprehensive documentation included
- All commits with meaningful messages"

# Push to GitHub
git push origin v0/tusharshinde042006-4570-3393300d
```

### 6.2 Create Pull Request
```
1. Go to: https://github.com/tusharshi123/lumina-project
2. Click "Pull requests" tab
3. Click "New pull request"
4. Select:
   Base: main
   Compare: v0/tusharshinde042006-4570-3393300d
5. Click "Create pull request"
6. Add title: "feat: Level 2 - Stellar smart contracts & real-time features"
7. Add description with all commits and details
8. Click "Create pull request"
```

### 6.3 Deploy to Vercel
```bash
# From v0 interface:
1. Click "Publish" button (top right)
2. Follow the deployment steps
3. Copy your live URL: https://lumina-project.vercel.app

# Or from GitHub:
1. Connect repo to Vercel
2. Vercel auto-deploys on push
3. Get live URL from dashboard
```

---

## Quick Reference: File Locations

```
/vercel/share/v0-project/
├── contract/src/lib.rs                 ← Smart contract
├── services/
│   ├── contract-service.ts             ← Contract calls
│   ├── error-handler.ts                ← Error handling
│   └── transaction-tracker.ts          ← TX tracking
├── hooks/
│   ├── use-transaction-tracker.ts      ← Tracker hook
│   └── use-contract-events.ts          ← Event listener
├── components/
│   ├── grant-card.tsx                  ← Updated with status
│   ├── impact-feed.tsx                 ← Updated with live data
│   └── error-boundary.tsx              ← Error UI
├── contexts/
│   └── wallet-context.tsx              ← Wallet state
├── .env.example                        ← Config template
├── README.md                           ← Main docs
├── CONTRACT_DEPLOYMENT.md              ← Deploy guide
├── COMMITS.md                          ← Commit patterns
└── LEVEL2_CHECKLIST.md                 ← Submission checklist
```

---

## Troubleshooting

### Issue: "soroban: command not found"
```
Solution: Install Soroban CLI again
brew install stellar/stable/soroban-cli
```

### Issue: "Error: Not enough balance"
```
Solution: Fund your testnet account with more XLM
Visit: https://developers.stellar.org/docs/more/testnet-details#get-testnet-lumens
```

### Issue: "Contract not found" error
```
Solution: Check your NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local
Make sure it matches the deployed contract address exactly
```

### Issue: Transaction fails but no error message
```
Solution: Check browser console (F12 → Console tab)
Look for [v0] debug messages
```

---

## Final Checklist Before Submission

- [ ] Step 1: Contract deployed to testnet
- [ ] Step 2: Contract address added to .env.local
- [ ] Step 3: All tests passed locally (wallet, donation, errors)
- [ ] Step 4: 6 meaningful git commits created
- [ ] Step 5: 3 screenshots taken and saved
- [ ] Step 5: SUBMISSION_DETAILS.txt filled out
- [ ] Step 6: Pushed to GitHub and PR created
- [ ] Step 6: (Optional) Deployed to Vercel
- [ ] Ready to submit for Level 2 review!
