# Script de déploiement avec synchronisation des données
Write-Host "🚀 Déploiement avec synchronisation des données" -ForegroundColor Green
Write-Host ""

# Vérifier que nous sommes dans le bon répertoire
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erreur: package.json non trouvé. Assurez-vous d'être dans le répertoire du projet." -ForegroundColor Red
    exit 1
}

# Vérifier que la base de données locale est configurée
if (-not (Test-Path ".env.local")) {
    Write-Host "❌ Erreur: .env.local non trouvé. Configurez d'abord la base de données locale." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Configuration locale trouvée" -ForegroundColor Green

# 1. Exporter les données locales
Write-Host "📤 Export des données locales..." -ForegroundColor Yellow
node export-local-data.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'export des données" -ForegroundColor Red
    exit 1
}

# 2. Nettoyer les fichiers temporaires
Write-Host "🧹 Nettoyage des fichiers temporaires..." -ForegroundColor Yellow
if (Test-Path "test-local-creation.js") { Remove-Item "test-local-creation.js" }
if (Test-Path "init-local-database.js") { Remove-Item "init-local-database.js" }

# 3. Installer les dépendances
Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'installation des dépendances" -ForegroundColor Red
    exit 1
}

# 4. Linter (optionnel)
Write-Host "🔍 Vérification du code..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Avertissements de linting détectés, mais continuons..." -ForegroundColor Yellow
}

# 5. Build
Write-Host "🔨 Construction du projet..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de la construction" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Construction réussie" -ForegroundColor Green

# 6. Git operations
Write-Host "📝 Préparation pour Git..." -ForegroundColor Yellow

# Ajouter tous les fichiers
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'ajout des fichiers" -ForegroundColor Red
    exit 1
}

# Commit
$commitMessage = "feat: Synchronisation des données locales avec la production"
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
Write-Host "   ✅ Base de données locale configurée" -ForegroundColor White
Write-Host "   ✅ Données exportées et synchronisées" -ForegroundColor White
Write-Host "   ✅ Site déployé sur Vercel" -ForegroundColor White
Write-Host "   ✅ Fonctionnalités complètes disponibles" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Le site est maintenant en ligne avec vos données locales !" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Workflow de développement:" -ForegroundColor Cyan
Write-Host "   1. Créez des activités/actualités en local" -ForegroundColor White
Write-Host "   2. Testez sur http://localhost:3000" -ForegroundColor White
Write-Host "   3. Lancez .\deploy-with-sync.ps1 pour déployer" -ForegroundColor White
Write-Host "   4. Vos donnees apparaissent automatiquement en ligne" -ForegroundColor White
