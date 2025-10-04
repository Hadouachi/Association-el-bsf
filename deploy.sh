#!/bin/bash

# Script de déploiement pour Association El BSF
echo "🚀 Déploiement de l'Association El BSF"

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé. Assurez-vous d'être dans le répertoire du projet."
    exit 1
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Vérifier le code avec ESLint
echo "🔍 Vérification du code..."
npm run lint

# Build du projet
echo "🏗️ Construction du projet..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi!"
    echo ""
    echo "📋 Étapes suivantes pour le déploiement:"
    echo "1. Pousser le code sur GitHub:"
    echo "   git add ."
    echo "   git commit -m 'Deploy: Mise en ligne du site'"
    echo "   git push origin main"
    echo ""
    echo "2. Aller sur https://vercel.com"
    echo "3. Connecter votre repository GitHub"
    echo "4. Configurer les variables d'environnement:"
    echo "   - DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT"
    echo "   - NEXTAUTH_SECRET, NEXTAUTH_URL"
    echo ""
    echo "5. Importer les données avec le script database-import.sql"
    echo ""
    echo "🎉 Votre site sera en ligne!"
else
    echo "❌ Erreur lors du build. Vérifiez les erreurs ci-dessus."
    exit 1
fi
