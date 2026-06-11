#!/bin/bash

# Quick Start Script for Portfolio Website
# Usage: bash quickstart.sh

echo "🚀 Portfolio Website - Quick Start"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check Node.js
echo -e "${BLUE}Step 1: Checking Node.js installation...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js ${NODE_VERSION} found${NC}"
else
    echo -e "${YELLOW}✗ Node.js not found${NC}"
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Step 2: Install dependencies
echo ""
echo -e "${BLUE}Step 2: Installing dependencies...${NC}"
if npm install; then
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${YELLOW}✗ Failed to install dependencies${NC}"
    exit 1
fi

# Step 3: Create .env file
echo ""
echo -e "${BLUE}Step 3: Setting up environment...${NC}"
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env file${NC}"
    echo -e "${YELLOW}⚠ Please edit .env with your information${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

# Step 4: Check if git is initialized
echo ""
echo -e "${BLUE}Step 4: Checking Git...${NC}"
if [ -d .git ]; then
    echo -e "${GREEN}✓ Git repository initialized${NC}"
else
    echo -e "${YELLOW}Initializing Git repository...${NC}"
    git init
    git add .
    git commit -m "Initial commit: portfolio website"
    echo -e "${GREEN}✓ Git repository created${NC}"
fi

# Step 5: Create necessary directories
echo ""
echo -e "${BLUE}Step 5: Creating directories...${NC}"
mkdir -p contracts/build artifacts scripts/deploy logs
echo -e "${GREEN}✓ Directories created${NC}"

# Step 6: Summary
echo ""
echo -e "${GREEN}=================================="
echo "✓ Quick Start Complete!"
echo "==================================${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Edit .env file with your information"
echo "2. Update index.html with your details"
echo "3. Customize styling in src/css/styles.css"
echo "4. Run: ${YELLOW}npm start${NC}"
echo ""
echo -e "${BLUE}Deployment options:${NC}"
echo "• GitHub Pages: See DEPLOYMENT.md"
echo "• Vercel: See DEPLOYMENT.md"
echo "• Docker: ${YELLOW}docker-compose up${NC}"
echo ""
echo -e "${YELLOW}Documentation:${NC}"
echo "• README.md - Project overview"
echo "• DEPLOYMENT.md - Deployment guide"
echo "• .env.example - Environment variables"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
