# 🚀 TaskFlow - Quick Start Guide

Get TaskFlow up and running in under 2 minutes!

## 📋 What You Need

- Node.js (v14+)
- MongoDB (running locally)
- Git

## ⚡ One-Command Setup

### For macOS/Linux:
```bash
git clone <repository-url>
cd taskflow
./setup.sh
```

### For Windows:
```cmd
git clone <repository-url>
cd taskflow
setup.bat
```

## 🎯 What the Setup Does

1. ✅ Creates environment files (.env, .env.local)
2. ✅ Installs all dependencies (frontend + backend)
3. ✅ Creates startup scripts
4. ✅ Configures the project structure

## 🏃‍♂️ Start the Application

```bash
npm run dev
```

This starts both frontend and backend servers:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 🔑 First Steps

1. **Start MongoDB**: `mongod`
2. **Run the app**: `npm run dev`
3. **Open browser**: Go to http://localhost:5173
4. **Register**: Create your first user account
5. **Login**: Access the dashboard

## 🎛️ Available Commands

```bash
npm run dev          # Start both servers
npm run dev:frontend # Frontend only
npm run dev:backend  # Backend only
```

## 🛠️ Tasks Implemented

- ✅ **Task 1**: Authentication & Landing Page
- ✅ **Task 2**: Task Filtering (status + search)
- ✅ **Task 3**: Admin User Log Management

## 🆘 Quick Troubleshooting

- **MongoDB error**: Make sure MongoDB is running (`mongod`)
- **Port in use**: Kill processes on ports 5000 and 5173
- **Module errors**: Run `npm install` in both root and server directories

## 🎉 You're Ready!

The application is clean - no fake data. Start by registering your first user and explore the features!

---

For detailed documentation, see [README.md](README.md) 