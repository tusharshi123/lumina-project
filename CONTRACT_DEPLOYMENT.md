// Soroban Smart Contract Deployment Guide for Lumina
// Platform: Stellar Testnet
// Language: Rust
// Framework: Soroban

## Prerequisites

1. Install Soroban CLI:
```bash
curl https://stellar.org/install-soroban-cli | bash
```

2. Install Rust:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-unknown-unknown
```

3. Create funded testnet account:
```bash
soroban keys generate --network testnet myaccount
```

Get test XLM from: https://stellar.org/developers/testnet-funding-guide

## Build the Contract

```bash
cd contract
soroban contract build
```

Output: `target/wasm32-unknown-unknown/release/lumina_contract.wasm`

## Deploy to Testnet

```bash
soroban contract deploy \
  --network testnet \
  --source myaccount \
  --wasm target/wasm32-unknown-unknown/release/lumina_contract.wasm
```

This returns a contract address like:
```
CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## Initialize Contract

```bash
soroban contract invoke \
  --network testnet \
  --source myaccount \
  --id CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
  -- initialize \
  --token GBUQWP3BOUZX34ULNQG23RQ6F4BFXWBQQY5OJO7UTXJcarson2BRXPC
```

## Test Contract

```bash
soroban contract invoke \
  --network testnet \
  --source myaccount \
  --id CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
  -- create_grant \
  --title "Education Fund" \
  --goal 100000000 \
  --owner GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## Add to Environment

Create `.env.local`:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_STELLAR_NETWORK=testnet
```

## Verify Deployment

Visit Stellar Expert:
https://stellar.expert/explorer/testnet/contract/CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

## Error Handling Integration

The frontend handles three error types during contract interaction:

1. **WalletError**: Raised when wallet is not connected or connection is rejected
   - Trigger: User clicks donate without connected wallet
   - Response: Show wallet connection prompt

2. **InsufficientBalanceError**: Raised when account balance < transaction amount
   - Trigger: Attempting to donate more than available balance
   - Response: Display balance requirement and current balance

3. **ContractError**: Raised when contract call fails
   - Trigger: Contract execution errors, invalid parameters
   - Response: Show error details from Soroban RPC

## Production Deployment

For Level 3, deploy to Stellar Public Network:

```bash
soroban contract deploy \
  --network public \
  --source mainnetaccount \
  --wasm target/wasm32-unknown-unknown/release/lumina_contract.wasm
```

## Troubleshooting

### Issue: "Account not found"
Solution: Fund account with https://stellar.org/developers/testnet-funding-guide

### Issue: "Insufficient balance"
Solution: Check account balance and fund if needed

### Issue: "Contract not found"
Solution: Verify contract address and network (testnet vs public)

### Issue: "Function not found"
Solution: Ensure contract is compiled and initialized

## Resources

- Soroban Docs: https://soroban.stellar.org
- Stellar Network: https://stellar.org/developers
- Soroban CLI Reference: https://soroban.stellar.org/docs/build/cli
- Contract Examples: https://github.com/stellar/soroban-examples
