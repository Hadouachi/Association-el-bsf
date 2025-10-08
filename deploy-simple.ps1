# Script de déploiement simple
Write-Host "🚀 Déploiement du site" -ForegroundColor Green
Write-Host ""

# 1. Exporter les données locales
Write-Host "📤 Export des données locales..." -ForegroundColor Yellow
node export-local-data.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'export des données" -ForegroundColor Red
    exit 1
}

# 2. Installer les dépendances
Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
npm install

# 3. Build
Write-Host "🔨 Construction du projet..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de la construction" -ForegroundColor Red
    exit 1
}

# 4. Git operations
Write-Host "📝 Préparation pour Git..." -ForegroundColor Yellow
git add .
git commit -m "feat: Deploy with local data sync"
git push origin main

Write-Host ""
Write-Host "🎉 Déploiement terminé !" -ForegroundColor Green
Write-Host "Le site sera mis à jour sur Vercel dans quelques minutes."