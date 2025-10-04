# 🚀 Guide de Déploiement - Association El BSF

## ✅ Préparation terminée !

Le projet est maintenant prêt pour le déploiement avec :
- ✅ Build réussi (0 erreurs)
- ✅ Tous les fichiers de configuration créés
- ✅ Base de données exportée
- ✅ Scripts de déploiement prêts

## 🎯 Étapes pour mettre le site en ligne

### 1. 📤 Pousser le code sur GitHub

```bash
# Ajouter tous les fichiers
git add .

# Créer un commit
git commit -m "Deploy: Site prêt pour la production"

# Pousser sur GitHub
git push origin main
```

### 2. 🌐 Déployer sur Vercel

1. **Aller sur [vercel.com](https://vercel.com)**
2. **Se connecter avec GitHub**
3. **Importer le projet** `Association-el-bsf`
4. **Configurer les variables d'environnement** (voir section suivante)

### 3. 🗄️ Configurer la base de données

#### Option A : PlanetScale (Recommandé)
1. Créer un compte sur [PlanetScale](https://planetscale.com)
2. Créer une nouvelle base de données `association_el_bsf`
3. Exécuter le script `create-production-tables.sql`
4. Importer les données avec `database-import.sql`

#### Option B : Railway
1. Créer un compte sur [Railway](https://railway.app)
2. Créer un service MySQL
3. Exécuter le script `create-production-tables.sql`
4. Importer les données avec `database-import.sql`

### 4. ⚙️ Variables d'environnement dans Vercel

Dans Vercel Dashboard > Settings > Environment Variables, ajouter :

```env
# Base de données
DB_HOST=votre_host_mysql
DB_USER=votre_username
DB_PASSWORD=votre_password
DB_NAME=association_el_bsf
DB_PORT=3306

# Next.js
NEXTAUTH_SECRET=votre_secret_aleatoire_32_caracteres
NEXTAUTH_URL=https://votre-domaine.vercel.app
```

### 5. 🔄 Redéployer

Après avoir configuré les variables d'environnement :
1. Aller dans Vercel Dashboard > Deployments
2. Cliquer sur "Redeploy" sur le dernier déploiement

## 📁 Fichiers créés pour le déploiement

- `vercel.json` - Configuration Vercel
- `create-production-tables.sql` - Script de création des tables
- `database-import.sql` - Script d'importation des données
- `database-export.json` - Export de vos données locales
- `deploy.ps1` - Script de déploiement Windows
- `deploy.sh` - Script de déploiement Linux/Mac
- `.gitignore` - Fichiers à ignorer par Git

## 🎉 Résultat attendu

Après le déploiement, votre site sera accessible à :
- **URL Vercel** : `https://association-el-bsf.vercel.app`
- **Domain personnalisé** : Si configuré

## 🔧 Fonctionnalités disponibles

- ✅ **Page d'accueil** avec carousel d'actualités
- ✅ **Gestion des activités** (CRUD complet)
- ✅ **Gestion des actualités** (CRUD complet)
- ✅ **Gestion de la page À propos** (CRUD complet)
- ✅ **Interface admin** complète
- ✅ **Upload d'images et vidéos**
- ✅ **Design responsive**
- ✅ **Internationalisation** (FR/EN)

## 🆘 Support

Si vous rencontrez des problèmes :
1. Vérifier les logs dans Vercel Dashboard
2. S'assurer que toutes les variables d'environnement sont correctes
3. Vérifier que la base de données est accessible
4. Contacter le support technique

## 🎊 Félicitations !

Votre site Association El BSF est maintenant prêt à être mis en ligne ! 🚀
