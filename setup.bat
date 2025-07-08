@echo off
setlocal enabledelayedexpansion

REM TaskFlow Project Setup Script for Windows
REM This script sets up the entire TaskFlow project automatically

echo.
echo 🚀 TaskFlow Project Setup Starting...
echo ================================================

REM Check if Node.js is installed
echo 📋 Step: Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm found: %NPM_VERSION%

REM Setup Backend
echo 📋 Step: Setting up Backend...
cd server

REM Copy env.example to .env
if exist "env.example" (
    copy env.example .env >nul
    echo ✅ Backend environment file (.env) created
) else (
    echo ❌ env.example file not found in server directory
    pause
    exit /b 1
)

REM Install backend dependencies
echo 📋 Step: Installing backend dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed

REM Go back to root
cd ..

REM Setup Frontend
echo 📋 Step: Setting up Frontend...

REM Create frontend .env.local file
echo # Frontend Environment Variables > .env.local
echo VITE_API_URL=http://localhost:5000 >> .env.local
echo VITE_APP_NAME=TaskFlow >> .env.local
echo VITE_NODE_ENV=development >> .env.local

echo ✅ Frontend environment file (.env.local) created

REM Install frontend dependencies
echo 📋 Step: Installing frontend dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed

REM Create startup scripts
echo 📋 Step: Creating startup scripts...

REM Create backend startup script
echo @echo off > server\start.bat
echo echo 🚀 Starting TaskFlow Backend Server... >> server\start.bat
echo npm run dev >> server\start.bat

REM Create frontend startup script
echo @echo off > start-frontend.bat
echo echo 🚀 Starting TaskFlow Frontend... >> start-frontend.bat
echo npm run dev >> start-frontend.bat

REM Create combined startup script
echo @echo off > start-all.bat
echo echo 🚀 Starting TaskFlow Application... >> start-all.bat
echo echo ================================================ >> start-all.bat
echo echo 📡 Starting Backend Server... >> start-all.bat
echo start /b cmd /c "cd server && npm run dev" >> start-all.bat
echo timeout /t 3 /nobreak ^>nul >> start-all.bat
echo echo 🌐 Starting Frontend... >> start-all.bat
echo start /b cmd /c "npm run dev" >> start-all.bat
echo echo ================================================ >> start-all.bat
echo echo ✅ TaskFlow is starting up! >> start-all.bat
echo echo 📡 Backend: http://localhost:5000 >> start-all.bat
echo echo 🌐 Frontend: http://localhost:5173 >> start-all.bat
echo echo ================================================ >> start-all.bat
echo echo Press any key to stop all servers >> start-all.bat
echo pause >> start-all.bat
echo taskkill /f /im node.exe >> start-all.bat

echo ✅ Startup scripts created

REM Create package.json scripts if it doesn't exist
echo 📋 Step: Updating package.json scripts...

if not exist "package.json" (
    echo { > package.json
    echo   "name": "taskflow-project", >> package.json
    echo   "version": "1.0.0", >> package.json
    echo   "description": "TaskFlow MERN Stack Application", >> package.json
    echo   "scripts": { >> package.json
    echo     "setup": "setup.bat", >> package.json
    echo     "dev": "start-all.bat", >> package.json
    echo     "start": "start-all.bat", >> package.json
    echo     "dev:frontend": "start-frontend.bat", >> package.json
    echo     "dev:backend": "cd server && npm run dev", >> package.json
    echo     "install:all": "npm install && cd server && npm install", >> package.json
    echo     "clean": "rmdir /s /q node_modules server\\node_modules && del .env.local server\\.env" >> package.json
    echo   }, >> package.json
    echo   "keywords": ["taskflow", "mern", "task-management"], >> package.json
    echo   "author": "TaskFlow Team", >> package.json
    echo   "license": "MIT" >> package.json
    echo } >> package.json
    echo ✅ Root package.json created
)

echo 📋 Step: Final setup steps...

REM Display final instructions
echo.
echo ================================================
echo ✅ 🎉 TaskFlow Setup Complete!
echo ================================================
echo.
echo 📋 Available Commands:
echo   npm run dev          - Start both frontend and backend
echo   npm run dev:frontend - Start frontend only
echo   npm run dev:backend  - Start backend only
echo   start-all.bat        - Start both (direct script)
echo.
echo 🌐 Application URLs:
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000
echo.
echo 📁 Important Files Created:
echo   server\.env          - Backend environment variables
echo   .env.local           - Frontend environment variables
echo   start-all.bat        - Combined startup script
echo   start-frontend.bat   - Frontend startup script
echo   server\start.bat     - Backend startup script
echo.
echo ⚠️  Next Steps:
echo 1. Start your MongoDB server: mongod
echo 2. Run: npm run dev (or start-all.bat)
echo 3. Open http://localhost:5173 in your browser
echo.
echo ✅ Happy coding! 🚀

pause 