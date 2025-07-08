#!/bin/bash

# TaskFlow Project Setup Script
# This script sets up the entire TaskFlow project automatically

set -e  # Exit on any error

echo "🚀 TaskFlow Project Setup Starting..."
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${BLUE}📋 Step: $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js is installed
print_step "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

NODE_VERSION=$(node --version)
print_success "Node.js found: $NODE_VERSION"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

NPM_VERSION=$(npm --version)
print_success "npm found: $NPM_VERSION"

# Setup Backend
print_step "Setting up Backend..."
cd server

# Copy env.example to .env
if [ -f "env.example" ]; then
    cp env.example .env
    print_success "Backend environment file (.env) created"
else
    print_error "env.example file not found in server directory"
    exit 1
fi

# Install backend dependencies
print_step "Installing backend dependencies..."
npm install
print_success "Backend dependencies installed"

# Go back to root
cd ..

# Setup Frontend
print_step "Setting up Frontend..."

# Create frontend .env.local file
cat > .env.local << EOF
# Frontend Environment Variables
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=TaskFlow
VITE_NODE_ENV=development
EOF

print_success "Frontend environment file (.env.local) created"

# Install frontend dependencies
print_step "Installing frontend dependencies..."
npm install
print_success "Frontend dependencies installed"

# Create startup scripts
print_step "Creating startup scripts..."

# Create backend startup script
cat > server/start.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting TaskFlow Backend Server..."
npm run dev
EOF

chmod +x server/start.sh

# Create frontend startup script
cat > start-frontend.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting TaskFlow Frontend..."
npm run dev
EOF

chmod +x start-frontend.sh

# Create combined startup script
cat > start-all.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting TaskFlow Application..."
echo "================================================"

# Function to kill background processes on exit
cleanup() {
    echo "🛑 Stopping servers..."
    kill $(jobs -p) 2>/dev/null || true
    exit 0
}

# Set trap to cleanup on exit
trap cleanup SIGINT SIGTERM

# Start backend in background
echo "📡 Starting Backend Server..."
cd server
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend in background
echo "🌐 Starting Frontend..."
npm run dev &
FRONTEND_PID=$!

echo "================================================"
echo "✅ TaskFlow is starting up!"
echo "📡 Backend: http://localhost:5000"
echo "🌐 Frontend: http://localhost:5173"
echo "================================================"
echo "Press Ctrl+C to stop all servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
EOF

chmod +x start-all.sh

print_success "Startup scripts created"

# Create package.json scripts
print_step "Updating package.json scripts..."

# Check if package.json exists in root
if [ ! -f "package.json" ]; then
    # Create a minimal package.json for project management
    cat > package.json << 'EOF'
{
  "name": "taskflow-project",
  "version": "1.0.0",
  "description": "TaskFlow MERN Stack Application",
  "scripts": {
    "setup": "./setup.sh",
    "dev": "./start-all.sh",
    "start": "./start-all.sh",
    "dev:frontend": "./start-frontend.sh",
    "dev:backend": "cd server && npm run dev",
    "install:all": "npm install && cd server && npm install",
    "clean": "rm -rf node_modules server/node_modules .env.local server/.env"
  },
  "keywords": ["taskflow", "mern", "task-management"],
  "author": "TaskFlow Team",
  "license": "MIT"
}
EOF
    print_success "Root package.json created"
fi

print_step "Final setup steps..."

# Display final instructions
echo "================================================"
print_success "🎉 TaskFlow Setup Complete!"
echo "================================================"
echo ""
echo "📋 Available Commands:"
echo "  npm run dev          - Start both frontend and backend"
echo "  npm run dev:frontend - Start frontend only"
echo "  npm run dev:backend  - Start backend only"
echo "  ./start-all.sh       - Start both (direct script)"
echo ""
echo "🌐 Application URLs:"
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:5000"
echo ""
echo "📁 Important Files Created:"
echo "  server/.env          - Backend environment variables"
echo "  .env.local           - Frontend environment variables"
echo "  start-all.sh         - Combined startup script"
echo "  start-frontend.sh    - Frontend startup script"
echo "  server/start.sh      - Backend startup script"
echo ""
print_warning "Next Steps:"
echo "1. Start your MongoDB server: mongod"
echo "2. Run: npm run dev (or ./start-all.sh)"
echo "3. Open http://localhost:5173 in your browser"
echo ""
print_success "Happy coding! 🚀" 