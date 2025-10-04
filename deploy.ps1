# Script de déploiement pour Association El BSF (Windows)
Write-Host "🚀 Déploiement de l'Association El BSF" -ForegroundColor Green

# Vérifier que nous sommes dans le bon répertoire
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erreur: package.json non trouvé. Assurez-vous d'être dans le répertoire du projet." -ForegroundColor Red
    exit 1
}

# Installer les dépendances
Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
npm install

# Vérifier le code avec ESLint
Write-Host "🔍 Vérification du code..." -ForegroundColor Yellow
npm run lint

# Build du projet
Write-Host "🏗️ Construction du projet..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build réussi!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Étapes suivantes pour le déploiement:" -ForegroundColor Cyan
    Write-Host "1. Pousser le code sur GitHub:" -ForegroundColor White
    Write-Host "   git add ." -ForegroundColor Gray
    Write-Host "   git commit -m 'Deploy: Mise en ligne du site'" -ForegroundColor Gray
    Write-Host "   git push origin main" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Aller sur https://vercel.com" -ForegroundColor White
    Write-Host "3. Connecter votre repository GitHub" -ForegroundColor White
    Write-Host "4. Configurer les variables d'environnement:" -ForegroundColor White
    Write-Host "   - DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT" -ForegroundColor Gray
    Write-Host "   - NEXTAUTH_SECRET, NEXTAUTH_URL" -ForegroundColor Gray
    Write-Host ""
    Write-Host "5. Importer les données avec le script database-import.sql" -ForegroundColor White
    Write-Host ""
    Write-Host "🎉 Votre site sera en ligne!" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur lors du build. Vérifiez les erreurs ci-dessus." -ForegroundColor Red
    exit 1
}