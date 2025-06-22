# 🚀 Deployment Guide

This guide will help you deploy your Food Delivery Sample Data Generator to GitHub Pages.

## 📋 Prerequisites

- A GitHub account
- Git installed on your computer
- Your project files ready

## 🎯 Quick Deployment Steps

### 1. Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `food-delivery-data-generator`)
5. Make it **Public** (required for free GitHub Pages)
6. Don't initialize with README (since you already have one)
7. Click "Create repository"

### 2. Upload Your Project

#### Option A: Using GitHub Desktop (Recommended for beginners)
1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Clone your repository to your computer
3. Copy all your project files into the repository folder
4. Commit and push the changes

#### Option B: Using Git Command Line
```bash
# Navigate to your project folder
cd "path/to/your/project"

# Initialize git repository
git init

# Add all files
git add .

# Commit the changes
git commit -m "Initial commit: Food Delivery Data Generator"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section (in the left sidebar)
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch
6. Select "/ (root)" folder
7. Click "Save"

### 4. Automatic Deployment

The project includes GitHub Actions workflows that will automatically deploy your site when you push changes to the main branch.

## 🌐 Access Your Deployed Site

Once deployed, your site will be available at:
```
https://yourusername.github.io/your-repo-name/
```

## 📁 File Structure After Deployment

Your deployed site will have this structure:
- **Main Page**: `https://yourusername.github.io/your-repo-name/` - Landing page
- **Data Generator**: `https://yourusername.github.io/your-repo-name/app.html` - Original version
- **Enhanced Analytics**: `https://yourusername.github.io/your-repo-name/enhanced-analytics/index.html` - React version

## 🔧 Custom Domain (Optional)

If you want to use a custom domain:

1. Purchase a domain name
2. In your repository Settings → Pages
3. Enter your custom domain
4. Add a `CNAME` file to your repository with your domain name
5. Configure DNS settings with your domain provider

## 🚨 Troubleshooting

### Site Not Loading
- Check that your repository is public
- Verify GitHub Pages is enabled in Settings
- Wait a few minutes for the first deployment

### Files Not Found
- Ensure all files are committed and pushed to GitHub
- Check that file paths in your HTML are correct
- Verify the `_config.yml` file is present

### GitHub Actions Not Working
- Check the "Actions" tab in your repository
- Ensure the workflow files are in `.github/workflows/`
- Verify you have proper permissions

## 📈 Monitoring Deployment

1. Go to your repository on GitHub
2. Click the "Actions" tab
3. You'll see the deployment workflow running
4. Click on the workflow to see detailed logs

## 🎉 Success!

Once deployed, you'll have:
- ✅ A professional landing page
- ✅ Two fully functional applications
- ✅ Automatic updates when you push changes
- ✅ Mobile-responsive design
- ✅ Modern UI with charts and analytics

## 🔗 Useful Links

- [GitHub Pages Documentation](https://pages.github.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

**Need Help?** Check the GitHub repository issues or create a new one for support. 