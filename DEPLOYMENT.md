# 🚀 Netlify Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Git repository set up
- Netlify account
- Backend API deployed and accessible

## Method 1: Deploy via Netlify UI (Recommended)

### Step 1: Prepare Your Repository
1. Ensure your code is pushed to GitHub
2. Verify the build works locally: `npm run build`

### Step 2: Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with your GitHub account
3. Click "New site from Git"
4. Choose "GitHub" as your Git provider
5. Select your repository

### Step 3: Configure Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18`

### Step 4: Set Environment Variables
Go to Site settings > Environment variables and add:
```
VITE_API_BASE_URL=https://your-backend-url.com/api/v1
```

### Step 5: Deploy
Click "Deploy site" and wait for the build to complete.

## Method 2: Deploy via Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```bash
netlify login
```

### Step 3: Initialize Netlify
```bash
netlify init
```
Choose "Create & configure a new project"

### Step 4: Deploy
```bash
npm run build
netlify deploy --prod --dir=dist
```

## Method 3: Manual Deployment

### Step 1: Build Locally
```bash
npm run build
```

### Step 2: Drag and Drop
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `dist` folder to the deployment area
3. Your site will be deployed instantly

## Post-Deployment Configuration

### 1. Set Environment Variables
- Go to Site settings > Environment variables
- Add your backend API URL

### 2. Configure Custom Domain (Optional)
- Go to Site settings > Domain management
- Add your custom domain

### 3. Update Backend CORS
Ensure your backend allows requests from your Netlify domain:
```javascript
// In your backend CORS configuration
const allowedOrigins = [
  'https://your-netlify-site.netlify.app',
  'https://your-custom-domain.com'
];
```

## Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Verify all dependencies are installed
- Check for TypeScript errors

### 404 Errors
- Ensure `netlify.toml` redirects are in place
- Verify SPA routing is configured

### API Errors
- Check environment variables are set correctly
- Verify backend CORS configuration
- Ensure backend is accessible from Netlify

### CORS Errors
- Update backend to allow Netlify domain
- Check API base URL in environment variables

## Configuration Files

### netlify.toml
```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables
Create a `.env` file for local development:
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## Performance Optimization

### 1. Enable Asset Optimization
- Netlify automatically optimizes assets
- Enable Brotli compression in site settings

### 2. Configure Caching
- Static assets are cached automatically
- Configure cache headers for API responses

### 3. Enable CDN
- Netlify provides global CDN
- No additional configuration needed

## Monitoring

### 1. Build Logs
- Monitor build logs in Netlify dashboard
- Set up build notifications

### 2. Analytics
- Enable Netlify Analytics
- Monitor site performance

### 3. Error Tracking
- Set up error monitoring
- Monitor API response times

## Security

### 1. Environment Variables
- Never commit sensitive data
- Use Netlify environment variables

### 2. HTTPS
- Netlify provides free SSL certificates
- Force HTTPS in site settings

### 3. Security Headers
- Configure security headers in `netlify.toml`
- Enable security features

## Support

If you encounter issues:
1. Check Netlify documentation
2. Review build logs
3. Verify configuration files
4. Test locally first
5. Contact Netlify support if needed
