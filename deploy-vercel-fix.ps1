# Script de déploiement Vercel avec export des données locales
Write-Host "🚀 Déploiement Vercel avec export des données" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Vérifier que nous sommes dans le bon répertoire
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erreur: package.json non trouvé. Assurez-vous d'être dans le répertoire du projet." -ForegroundColor Red
    exit 1
}

# Étape 1: Exporter les données locales
Write-Host "`n1️⃣ Export des données locales..." -ForegroundColor Yellow
node export-for-production.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'export des données" -ForegroundColor Red
    exit 1
}

# Vérifier que le fichier data-export.json existe
if (-not (Test-Path "data-export.json")) {
    Write-Host "❌ Fichier data-export.json non trouvé" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Données exportées avec succès" -ForegroundColor Green

# Étape 2: Installer les dépendances
Write-Host "`n2️⃣ Installation des dépendances..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'installation des dépendances" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dépendances installées" -ForegroundColor Green

# Étape 3: Test du build local
Write-Host "`n3️⃣ Test du build local..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du build local" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build local réussi" -ForegroundColor Green

# Étape 4: Git add et commit
Write-Host "`n4️⃣ Commit des changements..." -ForegroundColor Yellow
git add .
git commit -m "Deploy: Export des données locales pour Vercel"
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du commit" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Changements commités" -ForegroundColor Green

# Étape 5: Push vers GitHub
Write-Host "`n5️⃣ Push vers GitHub..." -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du push" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Code poussé vers GitHub" -ForegroundColor Green

# Étape 6: Instructions pour Vercel
Write-Host "`n6️⃣ Instructions pour Vercel:" -ForegroundColor Yellow
Write-Host "   - Vercel va automatiquement détecter le push" -ForegroundColor Cyan
Write-Host "   - Le build va utiliser les données exportées" -ForegroundColor Cyan
Write-Host "   - Les activités créées localement seront visibles" -ForegroundColor Cyan

Write-Host "`n🎉 Déploiement terminé !" -ForegroundColor Green
Write-Host "Le site sera mis à jour sur Vercel dans quelques minutes." -ForegroundColor Cyan
