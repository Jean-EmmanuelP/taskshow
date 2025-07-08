# TaskFlow - Task Management Application

## 🚀 Quick Start

### 1. Installation and Setup

```bash
./setup.sh
```

**This script will:**
- Install all frontend dependencies (React/Vite)
- Install all backend dependencies (Node.js/Express)
- Configure the development environment
- Create necessary configuration files

### 2. Launch the Application

```bash
npm run dev:all
```

**This command will:**
- Start the backend server on `http://localhost:5000`
- Start the frontend on `http://localhost:5173`

## 📋 Available Commands

```bash
# Start frontend only
npm run dev

# Start backend only
npm run dev:backend

# Start both (recommended)
npm run dev:all
```

## 🛠️ Technologies Used

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT + bcrypt
- **Email**: Nodemailer

## 📁 Project Structure

```
taskshow/
├── src/           # Frontend source code (React)
├── server/        # Backend source code (Node.js)
├── setup.sh       # Installation script
└── package.json   # Main configuration
```

---

**✅ Ready to develop!** Open `http://localhost:5173` in your browser.