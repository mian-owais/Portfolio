# DEPLOYMENT GUIDE

Complete step-by-step guide for deploying your portfolio website to production.

## Table of Contents

1. [Local Setup](#local-setup)
2. [GitHub Pages Deployment](#github-pages-deployment)
3. [Vercel Deployment](#vercel-deployment)
4. [Docker Deployment](#docker-deployment)
5. [Smart Contract Deployment](#smart-contract-deployment)
6. [Production Checklist](#production-checklist)

---

## Local Setup

### Step 1: Install Node.js

- Download from [https://nodejs.org/](https://nodejs.org/)
- Choose LTS version
- Verify installation: `node --version` and `npm --version`

### Step 2: Clone Repository

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Environment

```bash
cp .env.example .env
# Edit .env with your information
```

### Step 5: Run Locally

```bash
npm start
# Open http://localhost:8000 in your browser
```

---

## GitHub Pages Deployment

### Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name: `portfolio` (or any name)
3. Make it public
4. Don't initialize with any files

### Step 2: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit: portfolio website"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

### Step 3: Enable GitHub Actions

1. Go to Repository Settings
2. Navigate to "Pages" section
3. Source: Select "GitHub Actions"
4. The CI/CD will run automatically

### Step 4: Access Your Portfolio

Your portfolio will be available at:

```
https://yourusername.github.io/portfolio
```

### Step 5: Set Custom Domain (Optional)

1. Go to Repository Settings → Pages
2. Add your custom domain
3. Add DNS records to your domain provider:
   - Type: CNAME
   - Name: your-domain.com
   - Value: yourusername.github.io

---

## Vercel Deployment

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
vercel --prod
```

### Step 4: Configure Environment Variables

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add:
   - `PORTFOLIO_OWNER_ADDRESS`
   - `CONTRACT_ADDRESS`
   - Any other variables from `.env`

### Step 5: Access Your Portfolio

Your portfolio will be available at:

```
https://portfolio-yourusername.vercel.app
```

---

## Docker Deployment

### Step 1: Build Docker Image

```bash
docker build -t portfolio:latest .
```

### Step 2: Run Container Locally

```bash
docker run -p 8080:8080 portfolio:latest
# Visit http://localhost:8080
```

### Step 3: Docker Compose (with Nginx)

```bash
docker-compose up -d
# Visit https://localhost
```

### Step 4: Push to Docker Hub

```bash
docker tag portfolio:latest yourusername/portfolio:latest
docker push yourusername/portfolio:latest
```

### Step 5: Deploy to Server

```bash
# SSH into your server
ssh user@your-server.com

# Pull and run
docker pull yourusername/portfolio:latest
docker run -d -p 80:8080 -p 443:8443 --name portfolio yourusername/portfolio:latest
```

---

## Smart Contract Deployment

### Step 1: Setup Hardhat

```bash
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers
npx hardhat
```

### Step 2: Configure Network

Edit `hardhat.config.js`:

```javascript
networks: {
    sepolia: {
        url: process.env.SEPOLIA_RPC_URL,
        accounts: [process.env.PORTFOLIO_OWNER_PRIVATE_KEY]
    }
}
```

### Step 3: Get Test ETH (Testnet)

For Sepolia testnet:

1. Go to [Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)
2. Paste your wallet address
3. Get test ETH

### Step 4: Deploy Contract

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Step 5: Verify Contract

```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS
```

### Step 6: Update Portfolio

1. Copy contract address from deployment output
2. Update `.env`:
   ```env
   CONTRACT_ADDRESS=0x...
   ```
3. Update portfolio with contract features

---

## Production Checklist

### Before Going Live

- [ ] Update all personal information (name, email, socials)
- [ ] Customize color scheme and branding
- [ ] Add your projects with real details
- [ ] Update skill list with actual skills
- [ ] Test on all browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Test contact form functionality
- [ ] Test wallet connection
- [ ] Setup SSL certificate
- [ ] Configure CDN (optional)

### Security

- [ ] Never commit `.env` file
- [ ] Use GitHub Secrets for sensitive values
- [ ] Enable 2FA on accounts
- [ ] Use environment-specific configs
- [ ] Setup WAF (Web Application Firewall)
- [ ] Regular security audits
- [ ] Keep dependencies updated

### Performance

- [ ] Enable GZIP compression
- [ ] Minify CSS and JavaScript
- [ ] Optimize images
- [ ] Setup caching headers
- [ ] Use CDN for assets
- [ ] Monitor Core Web Vitals
- [ ] Test with PageSpeed Insights

### Monitoring

- [ ] Setup error tracking (Sentry)
- [ ] Setup analytics (Google Analytics)
- [ ] Setup uptime monitoring
- [ ] Configure alerts
- [ ] Regular backups
- [ ] Monitor server resources

### SEO

- [ ] Add meta tags
- [ ] Setup Google Search Console
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Submit to search engines
- [ ] Setup Google Analytics
- [ ] Configure Open Graph tags

---

## Updating Your Portfolio

### After Initial Deployment

#### Update Content

```bash
# Edit files locally
# Commit changes
git add .
git commit -m "Update portfolio content"
git push origin main
# CI/CD automatically deploys!
```

#### Update Smart Contract

```bash
# Make changes to contract
# Redeploy
npx hardhat run scripts/deploy.js --network sepolia
# Update contract address in .env
```

#### Update Dependencies

```bash
# Check for updates
npm outdated

# Update all
npm update

# Update specific package
npm install package-name@latest
```

---

## Troubleshooting

### GitHub Pages Not Updating

- Clear cache: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check Actions tab for errors
- Verify files are committed to main branch

### MetaMask Not Connecting

- Refresh page
- Check network selection
- Clear browser cache
- Try in incognito mode

### Contract Deployment Fails

- Check RPC URL
- Ensure sufficient gas
- Verify account has ETH
- Check contract syntax: `npx hardhat compile`

### Site Not Loading

- Check DNS records
- Verify domain configuration
- Check browser console for errors
- Test on different browser

---

## Monitoring & Maintenance

### Weekly

- [ ] Check analytics
- [ ] Monitor error logs
- [ ] Review contact form submissions

### Monthly

- [ ] Update dependencies
- [ ] Review performance metrics
- [ ] Check security updates

### Quarterly

- [ ] Full security audit
- [ ] Performance optimization review
- [ ] Update portfolio information
- [ ] Review competitor portfolios

---

## Additional Resources

### Documentation

- [Web3.js Docs](https://web3js.readthedocs.io/)
- [Solidity Docs](https://docs.soliditylang.org/)
- [Hardhat Docs](https://hardhat.org/)
- [GitHub Pages Guide](https://pages.github.com/)
- [Vercel Docs](https://vercel.com/docs)

### Tools

- [Etherscan](https://etherscan.io/) - Contract verification
- [Alchemy](https://www.alchemy.com/) - RPC provider
- [IPFS](https://ipfs.io/) - Decentralized storage
- [Pinata](https://pinata.cloud/) - IPFS pinning service

### Communities

- [Ethereum Stack Exchange](https://ethereum.stackexchange.com/)
- [ConsenSys Forums](https://consensys.net/)
- [Web3 Discord Servers](https://discord.gg/web3)

---

## Support

If you run into issues:

1. Check this guide
2. Search GitHub issues
3. Ask in Discord communities
4. Contact support for your hosting provider

Good luck with your portfolio! 🚀
