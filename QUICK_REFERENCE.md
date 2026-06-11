# Quick Reference Guide

Fast reference for common tasks and configurations.

## File Structure

```
portfolio/
├── 📄 index.html                          # Main portfolio page
├── 📁 src/
│   ├── 📁 css/
│   │   ├── styles.css                     # Main styling
│   │   └── responsive.css                 # Mobile responsive
│   ├── 📁 js/
│   │   ├── main.js                        # Core functionality
│   │   ├── web3.js                        # Web3 integration
│   │   ├── 📁 services/
│   │   │   ├── email-service.js          # Email handling
│   │   │   └── analytics-service.js      # Analytics tracking
│   │   ├── 📁 contracts/
│   │   │   └── PortfolioVerification.abi.js  # Contract ABI
│   │   └── 📁 tests/
│   │       └── portfolio.test.js         # Test suite
│   └── 📁 assets/                        # Images, fonts, etc.
├── 📁 contracts/
│   ├── PortfolioVerification.sol         # Smart contract
│   └── 📁 build/                         # Compiled contracts
├── 📁 scripts/
│   ├── deploy.js                         # Deployment script
│   └── verify.js                         # Contract verification
├── 📁 .github/
│   └── 📁 workflows/
│       └── deploy.yml                    # CI/CD pipeline
├── 📁 public/                            # Static files
├── 📄 package.json                       # Dependencies & scripts
├── 📄 hardhat.config.js                  # Smart contract config
├── 📄 docker-compose.yml                 # Docker setup
├── 📄 Dockerfile                         # Container image
├── 📄 nginx.conf                         # Web server config
├── 📄 vercel.json                        # Vercel deployment
├── 📄 .env.example                       # Environment template
├── 📄 .gitignore                         # Git ignore rules
├── 📄 .htaccess                          # Apache config
├── 📄 README.md                          # Full documentation
├── 📄 DEPLOYMENT.md                      # Deployment guide
├── 📄 quickstart.sh                      # Linux/Mac quick start
└── 📄 quickstart.bat                     # Windows quick start
```

## Common Commands

### Setup & Development

```bash
npm start                  # Start dev server (localhost:8000)
npm install               # Install dependencies
npm run build             # Build project
npm run lint              # Lint JavaScript
npm run prettier          # Format code
```

### Smart Contracts

```bash
npm run compile-contract  # Compile Solidity contract
npx hardhat test          # Run contract tests
npx hardhat run scripts/deploy.js --network sepolia  # Deploy to testnet
npx hardhat verify --network sepolia CONTRACT_ADDRESS  # Verify on block explorer
```

### Database & Testing

```bash
npm test                  # Run test suite
npm run test:watch       # Watch mode testing
npm run test:coverage    # Coverage report
```

### Docker

```bash
docker build -t portfolio .           # Build image
docker run -p 8080:8080 portfolio    # Run container
docker-compose up                     # Start with docker-compose
docker-compose down                   # Stop services
```

### Deployment

```bash
git push origin main                 # Push to GitHub (auto-deploys)
vercel --prod                        # Deploy to Vercel
npm run deploy                       # Custom deploy script
```

## Customization Quick Tips

### Change Colors

Edit `src/css/styles.css` top section:

```css
:root {
  --primary-color: #6c63ff; /* Main color */
  --secondary-color: #ff6584; /* Accent color */
  --dark-bg: #1a1a2e; /* Dark background */
  --light-bg: #f8f9fa; /* Light background */
}
```

### Update Portfolio Info

Edit `index.html`:

- Line 21: Your Name
- Line 22: Your Title
- Section elements for About, Projects, Skills, Contact

### Add New Project

In Projects section, add:

```html
<div class="project-card">
  <h3>Project Name</h3>
  <p>Description</p>
  <div class="project-tech">
    <span class="tech-tag">Technology</span>
  </div>
</div>
```

## Environment Variables

Create `.env` file:

```env
# Network
ETHEREUM_RPC_URL=https://eth-sepolia.alchemyapi.io/v2/YOUR_KEY
SEPOLIA_RPC_URL=https://eth-sepolia.alchemyapi.io/v2/YOUR_KEY

# Wallet (NEVER commit this!)
PORTFOLIO_OWNER_PRIVATE_KEY=0x...

# Contract Address (after deployment)
CONTRACT_ADDRESS=0x...

# Analytics
GOOGLE_ANALYTICS_ID=UA-...
```

## Web3 Functions

```javascript
// Connect wallet
const accounts = await connectWallet();

// Sign message
await verifyOnBlockchain();

// Check network
const network = await getNetworkInfo();

// Get balance
const balance = await getAccountBalance();
```

## Deployment Checklist

- [ ] Customize portfolio information
- [ ] Test on mobile devices
- [ ] Enable HTTPS
- [ ] Configure DNS records
- [ ] Setup analytics
- [ ] Test wallet connection
- [ ] Deploy smart contract
- [ ] Setup monitoring

---

**Version:** 1.0.0 | **Last Updated:** 2024
