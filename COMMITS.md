# Lumina Level 2 - Git Commit Guidelines

This document outlines the meaningful commits required for Level 2 submission.

## Commit Structure

Each commit should represent a logical, testable unit of work. Follow the pattern:

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Level 2 Required Commits

### Commit 1: Multi-Wallet Integration
```
feat(wallet): implement StellarWalletsKit integration

- Initialize StellarWalletsKit with Freighter and Albedo modules
- Add WalletProvider context for global wallet state
- Implement wallet connection modal
- Add address display and truncation utilities
- Handle wallet connection errors with WalletError class
```

### Commit 2: Error Handling System
```
feat(errors): implement 3-type error handling system

- Create WalletError for connection failures
- Create InsufficientBalanceError for balance validation
- Create ContractError for smart contract execution failures
- Add handleStellarError utility for error normalization
- Add ErrorBoundary component for graceful error UI
```

### Commit 3: Contract Service & Interaction
```
feat(contract): add Soroban contract interaction service

- Create ContractService for donation calls
- Implement balance checking functionality
- Add transaction status tracking (pending/success/failed)
- Integrate error handling (3 types)
- Add mock Soroban RPC integration
```

### Commit 4: Transaction Tracking & Events
```
feat(realtime): implement transaction tracking and event listening

- Create transactionTracker service with subscription model
- Add useTransactionTracker hook
- Add useContractEvents hook for real-time donations
- Implement event polling with interval-based checking
- Add transaction state persistence
```

### Commit 5: Grant Card & Impact Feed Update
```
feat(ui): add transaction status display and real-time updates

- Update GrantCard with donation transaction handling
- Add transaction status indicators (pending/success/failed)
- Show transaction hashes with error messages
- Integrate real-time event display in ImpactFeed
- Update stats with live transaction data
```

### Commit 6: Smart Contract Deployment
```
feat(contract): add Soroban smart contract

- Create donation contract with grant management
- Implement create_grant function
- Implement donate function with token transfer
- Add contract error handling
- Add CONTRACT_DEPLOYMENT.md guide
```

## Running Git Commits

```bash
# Initialize repo (if needed)
git init

# Stage files
git add .

# Create commit
git commit -m "feat(wallet): implement StellarWalletsKit integration

- Initialize StellarWalletsKit with Freighter and Albedo modules
- Add WalletProvider context for global wallet state"

# Push to GitHub
git push origin main
```

## Verify Commits

```bash
# View commit history
git log --oneline -n 10

# View single commit
git show <commit-hash>

# View statistics
git log --stat
```

## Level 2 Checklist

- [ ] Commit 1: Multi-Wallet Integration
- [ ] Commit 2: Error Handling (3 types)
- [ ] Commit 3: Contract Service
- [ ] Commit 4: Transaction Tracking
- [ ] Commit 5: UI Updates
- [ ] Commit 6: Smart Contract

**Minimum Required**: 2+ meaningful commits
**Recommended**: All 6 commits showing full Level 2 implementation

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guide](https://guides.github.com/)
