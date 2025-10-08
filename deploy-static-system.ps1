# Script PowerShell pour déployer le système statique
Write-Host "🚀 Déploiement du système statique" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Étape 1: Exporter les données locales
Write-Host "`n1️⃣ Export des données locales..." -ForegroundColor Yellow
node export-for-production.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'export des données" -ForegroundColor Red
    exit 1
}

# Étape 2: Vérifier que le fichier data-export.json existe
if (-not (Test-Path "data-export.json")) {
    Write-Host "❌ Fichier data-export.json non trouvé" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Données exportées avec succès" -ForegroundColor Green

# Étape 3: Build du projet
Write-Host "`n2️⃣ Build du projet..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du build" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build réussi" -ForegroundColor Green

# Étape 4: Git add et commit
Write-Host "`n3️⃣ Commit des changements..." -ForegroundColor Yellow
git add .
git commit -m "Deploy: Système statique avec données exportées"
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du commit" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Changements commités" -ForegroundColor Green

# Étape 5: Push vers GitHub
Write-Host "`n4️⃣ Push vers GitHub..." -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du push" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Code poussé vers GitHub" -ForegroundColor Green

# Étape 6: Instructions pour Vercel
Write-Host "`n5️⃣ Instructions pour Vercel:" -ForegroundColor Yellow
Write-Host "   - Vercel va automatiquement détecter le push" -ForegroundColor Cyan
Write-Host "   - Le build va utiliser les données statiques" -ForegroundColor Cyan
Write-Host "   - Aucune base de données externe nécessaire" -ForegroundColor Cyan

Write-Host "`n🎉 Déploiement terminé !" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host "📝 Votre site sera disponible sur Vercel avec les données locales" -ForegroundColor Cyan
Write-Host "🔧 Pour modifier le contenu:" -ForegroundColor Cyan
Write-Host "   1. Modifiez en local via l'interface admin" -ForegroundColor White
Write-Host "   2. Relancez ce script pour déployer" -ForegroundColor White
