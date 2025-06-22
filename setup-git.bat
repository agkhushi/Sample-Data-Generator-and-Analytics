@echo off
echo ========================================
echo Food Delivery Data Generator - Git Setup
echo ========================================
echo.

echo This script will help you set up Git and deploy to GitHub Pages
echo.

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo Git is installed. Proceeding with setup...
echo.

REM Initialize Git repository
echo Initializing Git repository...
git init

REM Add all files
echo Adding files to Git...
git add .

REM Initial commit
echo Creating initial commit...
git commit -m "Initial commit: Food Delivery Sample Data Generator with landing page"

echo.
echo ========================================
echo Git setup complete!
echo ========================================
echo.
echo Next steps:
echo 1. Create a GitHub repository at https://github.com/new
echo 2. Make it PUBLIC (required for free GitHub Pages)
echo 3. Run these commands:
echo    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
echo    git push -u origin main
echo 4. Enable GitHub Pages in repository Settings
echo.
echo For detailed instructions, see DEPLOYMENT.md
echo.
pause 