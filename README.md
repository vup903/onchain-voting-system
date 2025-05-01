# DAO Voting DApp 🗳️

This is a simple decentralized voting application where the owner can create proposals, and users can vote YES or NO using their Ethereum wallet.

## 🛠️ Tech Stack

- Solidity + Hardhat
- React + Ethers.js
- Goerli Testnet

## 🔧 How to Run

### 1. Compile and Deploy Contract

```bash
cd your-project-folder
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network goerli
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm start
```

### 3. Env Setup

Create `.env` file:

```
GOERLI_RPC_URL=https://eth-goerli.g.alchemy.com/v2/your_key
PRIVATE_KEY=your_private_key
```

## 🎯 Features

- Only owner can create proposals
- Anyone can vote on proposals
- Vote counts are publicly viewable
- Supports MetaMask interaction

## 📄 License

MIT
