Write-Host "Deploiement de l'Association El BSF" -ForegroundColor Green

if (-not (Test-Path "package.json")) {
    Write-Host "Erreur: package.json non trouve" -ForegroundColor Red
    exit 1
}

Write-Host "Installation des dependances..." -ForegroundColor Yellow
npm install

Write-Host "Verification du code..." -ForegroundColor Yellow
npm run lint

Write-Host "Construction du projet..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build reussi!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Etapes suivantes:" -ForegroundColor Cyan
    Write-Host "1. git add ." -ForegroundColor White
    Write-Host "2. git commit -m 'Deploy: Site pret'" -ForegroundColor White
    Write-Host "3. git push origin main" -ForegroundColor White
    Write-Host "4. Aller sur vercel.com" -ForegroundColor White
    Write-Host "5. Importer le projet GitHub" -ForegroundColor White
    Write-Host "6. Configurer les variables d'environnement" -ForegroundColor White
    Write-Host "7. Importer database-import.sql" -ForegroundColor White
    Write-Host ""
    Write-Host "Site en ligne!" -ForegroundColor Green
} else {
    Write-Host "Erreur lors du build" -ForegroundColor Red
    exit 1
}
