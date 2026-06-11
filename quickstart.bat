@echo off
REM Quick Start Script for Portfolio Website (Windows)
REM Usage: quickstart.bat

echo.
echo 🚀 Portfolio Website - Quick Start
echo ==================================
echo.

REM Step 1: Check Node.js
echo Step 1: Checking Node.js installation...
where /q node
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Node.js not found
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js %NODE_VERSION% found
echo.

REM Step 2: Install dependencies
echo Step 2: Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed
echo.

REM Step 3: Create .env file
echo Step 3: Setting up environment...
if not exist .env (
    copy .env.example .env
    echo ✓ Created .env file
    echo ⚠ Please edit .env with your information
) else (
    echo ✓ .env file already exists
)
echo.

REM Step 4: Create necessary directories
echo Step 4: Creating directories...
if not exist contracts\build mkdir contracts\build
if not exist artifacts mkdir artifacts
if not exist scripts\deploy mkdir scripts\deploy
if not exist logs mkdir logs
echo ✓ Directories created
echo.

REM Summary
echo ==================================
echo ✓ Quick Start Complete!
echo ==================================
echo.
echo Next steps:
echo 1. Edit .env file with your information
echo 2. Update index.html with your details
echo 3. Customize styling in src/css/styles.css
echo 4. Run: npm start
echo.
echo Deployment options:
echo - GitHub Pages: See DEPLOYMENT.md
echo - Vercel: See DEPLOYMENT.md
echo - Docker: docker-compose up
echo.
echo Documentation:
echo - README.md - Project overview
echo - DEPLOYMENT.md - Deployment guide
echo - .env.example - Environment variables
echo.
echo 🎉 Happy coding!
pause
