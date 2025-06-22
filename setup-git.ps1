# Food Delivery Data Generator - Git Setup Script
# PowerShell version

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Food Delivery Data Generator - Git Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This script will help you set up Git and deploy to GitHub Pages" -ForegroundColor Yellow
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = git --version
    Write-Host "Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/downloads" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Proceeding with setup..." -ForegroundColor Green
Write-Host ""

# Initialize Git repository
Write-Host "Initializing Git repository..." -ForegroundColor Yellow
git init

# Add all files
Write-Host "Adding files to Git..." -ForegroundColor Yellow
git add .

# Initial commit
Write-Host "Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Food Delivery Sample Data Generator with landing page"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Git setup complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Create a GitHub repository at https://github.com/new" -ForegroundColor White
Write-Host "2. Make it PUBLIC (required for free GitHub Pages)" -ForegroundColor White
Write-Host "3. Run these commands:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host "4. Enable GitHub Pages in repository Settings" -ForegroundColor White
Write-Host ""

Write-Host "For detailed instructions, see DEPLOYMENT.md" -ForegroundColor Yellow
Write-Host ""

Read-Host "Press Enter to continue" 