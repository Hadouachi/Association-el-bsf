# Guide de Déploiement - Association El BSF

## 🚀 Déploiement sur Vercel

### 1. Préparation du projet

Le projet est déjà configuré pour Vercel avec :
- ✅ `vercel.json` configuré
- ✅ Scripts de build dans `package.json`
- ✅ Structure Next.js 14 App Router

### 2. Base de données en production

#### Option A : PlanetScale (Recommandé)
1. Créer un compte sur [PlanetScale](https://planetscale.com)
2. Créer une nouvelle base de données
3. Obtenir l'URL de connexion
4. Configurer les variables d'environnement dans Vercel

#### Option B : Railway
1. Créer un compte sur [Railway](https://railway.app)
2. Créer un service MySQL
3. Obtenir l'URL de connexion
4. Configurer les variables d'environnement dans Vercel

### 3. Variables d'environnement à configurer

Dans le dashboard Vercel, ajouter :

```env
# Base de données
DB_HOST=votre_host
DB_USER=votre_username
DB_PASSWORD=votre_password
DB_NAME=association_el_bsf
DB_PORT=3306

# Ou utiliser DATABASE_URL pour une URL complète
DATABASE_URL=mysql://username:password@host:port/database_name

# Next.js
NEXTAUTH_SECRET=votre_secret_aleatoire
NEXTAUTH_URL=https://votre-domaine.vercel.app
```

### 4. Déploiement

1. **Connecter le repository GitHub à Vercel :**
   - Aller sur [vercel.com](https://vercel.com)
   - Se connecter avec GitHub
   - Importer le projet

2. **Configurer les variables d'environnement :**
   - Aller dans Settings > Environment Variables
   - Ajouter toutes les variables listées ci-dessus

3. **Déployer :**
   - Vercel déploiera automatiquement
   - Le site sera disponible à l'URL fournie

### 5. Configuration de la base de données

Après le déploiement, vous devrez :

1. **Créer les tables :**
   - Exécuter les scripts SQL de création de tables
   - Ou utiliser l'interface admin pour créer le contenu

2. **Migrer les données :**
   - Exporter les données de votre base locale
   - Les importer dans la base de production

### 6. Domain personnalisé (Optionnel)

1. Dans Vercel Dashboard > Domains
2. Ajouter votre domaine personnalisé
3. Configurer les DNS selon les instructions Vercel

## 📁 Structure du projet

```
├── app/
│   ├── api/                 # API Routes
│   ├── [locale]/           # Pages internationalisées
│   └── globals.css         # Styles globaux
├── components/             # Composants réutilisables
├── lib/                    # Stores et utilitaires
├── public/                 # Fichiers statiques
├── vercel.json            # Configuration Vercel
└── package.json           # Dépendances
```

## 🔧 Commandes utiles

```bash
# Installation des dépendances
npm install

# Développement local
npm run dev

# Build de production
npm run build

# Démarrage en production
npm start

# Linting
npm run lint
```

## 🐛 Résolution de problèmes

### Erreur de base de données
- Vérifier les variables d'environnement
- S'assurer que la base de données est accessible
- Vérifier les permissions de l'utilisateur

### Erreur d'upload
- Vérifier que le dossier `public/uploads` existe
- S'assurer que les permissions sont correctes

### Erreur de build
- Vérifier que toutes les dépendances sont installées
- S'assurer que le code TypeScript est valide
