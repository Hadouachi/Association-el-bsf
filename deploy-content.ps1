# Script de déploiement de contenu pour Association El BSF
# Usage: .\deploy-content.ps1 "Description des modifications"

param(
    [Parameter(Mandatory=$true)]
    [string]$Message
)

Write-Host "🚀 Déploiement du contenu vers Vercel..." -ForegroundColor Green

# 1. Vérifier que le serveur de développement n'est pas en cours
Write-Host "📋 Vérification de l'état du projet..." -ForegroundColor Yellow
$processes = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($processes) {
    Write-Host "⚠️  Arrêt du serveur de développement..." -ForegroundColor Yellow
    Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
}

# 2. Exporter les données locales
Write-Host "📊 Export des données locales..." -ForegroundColor Yellow
node export-for-production.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'export des données" -ForegroundColor Red
    exit 1
}

# 3. Ajouter tous les fichiers modifiés
Write-Host "📁 Ajout des fichiers modifiés..." -ForegroundColor Yellow
git add .

# 4. Commit avec le message fourni
Write-Host "💾 Sauvegarde des modifications..." -ForegroundColor Yellow
git commit -m $Message
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du commit" -ForegroundColor Red
    exit 1
}

# 5. Push vers GitHub (déclenche Vercel)
Write-Host "🚀 Déploiement vers Vercel..." -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du push" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Déploiement réussi !" -ForegroundColor Green
Write-Host "🌐 Votre site sera mis à jour dans 2-3 minutes sur Vercel" -ForegroundColor Cyan
Write-Host "📱 Vous pouvez vérifier le statut sur: https://vercel.com/dashboard" -ForegroundColor Cyan

