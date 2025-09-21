# Start Full Stack Application (Frontend + Backend)
Write-Host "🚀 Starting AyurSutra Full Stack Application..." -ForegroundColor Green

# Function to start backend
function Start-Backend {
    Write-Host "🔥 Starting Backend Server..." -ForegroundColor Cyan
    Set-Location "backend"
    
    if (-not (Test-Path "node_modules")) {
        Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
        npm install
    }
    
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"
    Set-Location ".."
}

# Function to start frontend
function Start-Frontend {
    Write-Host "⚡ Starting Frontend Server..." -ForegroundColor Cyan
    
    if (-not (Test-Path "node_modules")) {
        Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
        npm install
    }
    
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"
}

# Start both servers
Start-Backend
Start-Sleep -Seconds 3
Start-Frontend

Write-Host "✅ Both servers are starting..." -ForegroundColor Green
Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "🔧 Backend API: http://localhost:5000" -ForegroundColor Yellow
Write-Host "📊 Health Check: http://localhost:5000/api/health" -ForegroundColor Yellow

