# Netlify Deployment Script for Windows
Write-Host "🚀 Starting Netlify deployment..." -ForegroundColor Green

# Build the project
Write-Host "📦 Building project..." -ForegroundColor Yellow
npm run build

# Deploy to Netlify
Write-Host "🌐 Deploying to Netlify..." -ForegroundColor Yellow
netlify deploy --prod --dir=dist

Write-Host "✅ Deployment complete!" -ForegroundColor Green
