# Script de déploiement avec données locales
Write-Host "🚀 Déploiement avec données locales" -ForegroundColor Green
Write-Host ""

# Vérifier que nous sommes dans le bon répertoire
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erreur: package.json non trouvé. Assurez-vous d'être dans le répertoire du projet." -ForegroundColor Red
    exit 1
}

# Vérifier que les données locales existent
if (-not (Test-Path "data/localActivities.ts")) {
    Write-Host "❌ Erreur: Fichier de données locales non trouvé." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Données locales trouvées" -ForegroundColor Green

# Nettoyer les fichiers temporaires
Write-Host "🧹 Nettoyage des fichiers temporaires..." -ForegroundColor Yellow
if (Test-Path "test-local-system.js") { Remove-Item "test-local-system.js" }
if (Test-Path "test-local-simple.js") { Remove-Item "test-local-simple.js" }

# Installer les dépendances
Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'installation des dépendances" -ForegroundColor Red
    exit 1
}

# Linter (optionnel)
Write-Host "🔍 Vérification du code..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Avertissements de linting détectés, mais continuons..." -ForegroundColor Yellow
}

# Build
Write-Host "🔨 Construction du projet..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de la construction" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Construction réussie" -ForegroundColor Green

# Git operations
Write-Host "📝 Préparation pour Git..." -ForegroundColor Yellow

# Ajouter tous les fichiers
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'ajout des fichiers" -ForegroundColor Red
    exit 1
}

# Commit
$commitMessage = "feat: Ajout du système de données locales avec médias statiques"
git commit -m $commitMessage
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du commit" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Commit créé: $commitMessage" -ForegroundColor Green

# Push
Write-Host "📤 Envoi vers GitHub..." -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du push" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Push réussi" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Déploiement terminé avec succès !" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Résumé:" -ForegroundColor Cyan
Write-Host "   ✅ Données locales configurées" -ForegroundColor White
Write-Host "   ✅ Médias statiques créés" -ForegroundColor White
Write-Host "   ✅ Store modifié pour fallback local" -ForegroundColor White
Write-Host "   ✅ Code poussé vers GitHub" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Le site sera automatiquement déployé sur Vercel" -ForegroundColor Cyan
Write-Host "   - Avec données locales en fallback" -ForegroundColor White
Write-Host "   - Médias statiques intégrés" -ForegroundColor White
Write-Host "   - Fonctionnel même sans base de données" -ForegroundColor White
Write-Host ""
Write-Host "📝 Prochaines étapes:" -ForegroundColor Cyan
Write-Host "   1. Vérifiez le déploiement sur Vercel" -ForegroundColor White
Write-Host "   2. Testez les pages d'activités" -ForegroundColor White
Write-Host "   3. Remplacez les médias placeholder par de vraies images/vidéos" -ForegroundColor White
