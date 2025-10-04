Write-Host "Deploiement Association El BSF vers GitHub" -ForegroundColor Green

$gitUser = git config user.name
if (-not $gitUser) {
    Write-Host "Configuration Git manquante" -ForegroundColor Yellow
    git config user.email "admin@association-el-bsf.com"
    git config user.name "Association El BSF"
}

Write-Host "Verification du statut Git..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "Etapes suivantes pour mettre le site en ligne:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Creer un repository GitHub:" -ForegroundColor White
Write-Host "   - Aller sur github.com" -ForegroundColor Gray
Write-Host "   - Cliquer New repository" -ForegroundColor Gray
Write-Host "   - Nom: Association-el-bsf" -ForegroundColor Gray
Write-Host "   - Description: Site web officiel de l'Association El BSF" -ForegroundColor Gray
Write-Host "   - Cocher Public" -ForegroundColor Gray
Write-Host "   - Cliquer Create repository" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Connecter le projet (remplacer VOTRE-USERNAME):" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/VOTRE-USERNAME/Association-el-bsf.git" -ForegroundColor Gray
Write-Host "   git branch -M main" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Deployer sur Vercel:" -ForegroundColor White
Write-Host "   - Aller sur vercel.com" -ForegroundColor Gray
Write-Host "   - Se connecter avec GitHub" -ForegroundColor Gray
Write-Host "   - Importer le projet Association-el-bsf" -ForegroundColor Gray
Write-Host "   - Cliquer Deploy" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Configurer la base de donnees:" -ForegroundColor White
Write-Host "   - Utiliser PlanetScale ou Railway (gratuit)" -ForegroundColor Gray
Write-Host "   - Executer create-production-tables.sql" -ForegroundColor Gray
Write-Host "   - Importer database-import.sql" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Variables d'environnement dans Vercel:" -ForegroundColor White
Write-Host "   - DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT" -ForegroundColor Gray
Write-Host "   - NEXTAUTH_SECRET, NEXTAUTH_URL" -ForegroundColor Gray
Write-Host ""
Write-Host "6. Redeployer apres configuration" -ForegroundColor White
Write-Host ""
Write-Host "Voir QUICK_DEPLOY.md pour les instructions detaillees" -ForegroundColor Cyan
Write-Host ""
Write-Host "Votre site sera bientot en ligne !" -ForegroundColor Green
