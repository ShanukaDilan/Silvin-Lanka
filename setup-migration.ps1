# WhatsApp & Contact Form - Database Migration Script
# Run this script after starting Docker Desktop

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Database Migration Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
Write-Host "Checking Docker status..." -ForegroundColor Yellow
docker ps 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Docker Desktop is not running!" -ForegroundColor Red
    Write-Host "Please start Docker Desktop and try again." -ForegroundColor Red
    exit 1
}
Write-Host "✓ Docker is running" -ForegroundColor Green
Write-Host ""

# Start database container
Write-Host "Starting database container..." -ForegroundColor Yellow
docker-compose up -d db
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to start database container" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Database container started" -ForegroundColor Green
Write-Host ""

# Wait for database to be ready
Write-Host "Waiting for database to initialize (10 seconds)..." -ForegroundColor Yellow
Start-Sleep -Seconds 10
Write-Host "✓ Database should be ready" -ForegroundColor Green
Write-Host ""

# Run Prisma migration
Write-Host "Running Prisma migration..." -ForegroundColor Yellow
npx prisma migrate dev --name add_whatsapp_and_contact_submissions
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Migration failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Migration completed successfully" -ForegroundColor Green
Write-Host ""

# Generate Prisma client
Write-Host "Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate
Write-Host "✓ Prisma client generated" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Start the application: docker-compose up" -ForegroundColor White
Write-Host "2. Visit http://localhost:3000/admin/profile to add WhatsApp number" -ForegroundColor White
Write-Host "3. Visit http://localhost:3000/contact to test the contact form" -ForegroundColor White
Write-Host "4. Visit http://localhost:3000/admin/contacts to view submissions" -ForegroundColor White
Write-Host ""
