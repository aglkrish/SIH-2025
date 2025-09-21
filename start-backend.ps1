# Start Backend Server
Write-Host "🚀 Starting AyurSutra Backend Server..." -ForegroundColor Green

# Navigate to backend directory
Set-Location "backend"

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the backend server
Write-Host "🔥 Starting backend server on port 5000..." -ForegroundColor Cyan
npm run dev

