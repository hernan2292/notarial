#!/bin/bash

# Notarial - Quick Setup Script
# This script sets up the entire Notarial project

echo "🏠 Notarial - Quick Setup"
echo "========================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js 18+${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node --version)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm --version)${NC}"
echo ""

# Install frontend dependencies
echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
npm install
echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
echo ""

# Install backend dependencies
echo -e "${BLUE}📦 Installing backend dependencies...${NC}"
cd backend
npm install
cd ..
echo -e "${GREEN}✅ Backend dependencies installed${NC}"
echo ""

# Install contract dependencies
echo -e "${BLUE}📦 Installing contract dependencies...${NC}"
cd contracts
npm install
cd ..
echo -e "${GREEN}✅ Contract dependencies installed${NC}"
echo ""

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${BLUE}📝 Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ .env created from .env.example${NC}"
    echo -e "${RED}⚠️  Please edit .env with your API keys${NC}"
else
    echo -e "${GREEN}✅ .env already exists${NC}"
fi
echo ""

# Summary
echo "========================="
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "========================="
echo ""
echo "Next steps:"
echo ""
echo "1. Edit .env with your API keys:"
echo "   - VITE_WALLETCONNECT_PROJECT_ID"
echo "   - VITE_WORLD_ID_APP_ID"
echo "   - CROSSMINT_API_KEY"
echo "   - NFT_STORAGE_API_KEY"
echo ""
echo "2. Deploy contracts:"
echo "   cd contracts"
echo "   npm run deploy"
echo ""
echo "3. Start backend:"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "4. Start frontend:"
echo "   npm run dev"
echo ""
echo "5. Open http://localhost:5173"
echo ""
echo "📚 Read DEPLOYMENT.md for detailed instructions"
echo ""
echo -e "${GREEN}Happy hacking! 🚀${NC}"
