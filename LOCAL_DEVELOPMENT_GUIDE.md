# Guide de Développement Local avec Synchronisation

Ce guide explique comment développer en local avec une base de données MySQL et synchroniser les données avec la production.

## 🎯 Objectif

- **Développement local** : Créer et gérer des activités/actualités en local
- **Synchronisation** : Déployer les données locales vers la production
- **Workflow complet** : Du développement local au déploiement en ligne

## 🚀 Configuration Initiale

### 1. Base de Données Locale

Le fichier `.env.local` est configuré avec :
```
DATABASE_URL=mysql://root:Hadouachi20@@localhost:3306/association_el_bsf
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Tables Créées

- `Activity` - Activités avec médias et blocs de contenu
- `News` - Actualités avec contenu riche
- `AboutContent` - Contenu de la page À propos

## 🔧 Workflow de Développement

### Étape 1: Développement Local

```bash
# 1. Démarrer le serveur local
npm run dev

# 2. Accéder à l'interface admin
http://localhost:3000/fr/admin

# 3. Créer des activités/actualités
# - Utilisez l'interface admin
# - Les données sont sauvegardées en local
# - Testez toutes les fonctionnalités
```

### Étape 2: Test des Fonctionnalités

- ✅ **Création d'activités** avec images et vidéos
- ✅ **Création d'actualités** avec contenu riche
- ✅ **Gestion du contenu À propos**
- ✅ **Upload de médias** (images/vidéos)
- ✅ **Blocs de contenu personnalisés**

### Étape 3: Synchronisation et Déploiement

```powershell
# Lancer le déploiement avec synchronisation
.\deploy-with-sync.ps1
```

Ce script :
1. Exporte les données locales
2. Génère un script SQL
3. Construit le projet
4. Pousse vers GitHub
5. Déploie sur Vercel

## 📁 Structure des Fichiers

```
├── .env.local                    # Configuration locale
├── data/
│   ├── localActivities.ts        # Données de fallback
│   └── data-export.json          # Export des données (généré)
├── public/
│   ├── images/activities/        # Images statiques
│   └── videos/activities/        # Vidéos statiques
├── export-local-data.js          # Script d'export
├── deploy-with-sync.ps1          # Script de déploiement
└── data-sync.sql                 # Script SQL (généré)
```

## 🧪 Tests

### Test de Création

Le système a été testé avec succès :
- ✅ Récupération des activités existantes (4 activités)
- ✅ Création d'une nouvelle activité
- ✅ Vérification de l'ajout en base
- ✅ Interface admin fonctionnelle

### Vérification

```bash
# Vérifier que le serveur local fonctionne
http://localhost:3000/fr/activities
http://localhost:3000/fr/admin/activities
```

## 🔄 Synchronisation des Données

### Export Automatique

Le script `export-local-data.js` :
1. Se connecte à la base locale
2. Exporte toutes les tables
3. Génère un fichier JSON
4. Crée un script SQL pour la production

### Déploiement

Le script `deploy-with-sync.ps1` :
1. Lance l'export des données
2. Nettoie les fichiers temporaires
3. Installe les dépendances
4. Construit le projet
5. Pousse vers GitHub
6. Déploie sur Vercel

## 📊 Données Actuelles

La base de données locale contient :
- **4 activités** (dont 1 créée en test)
- **3 actualités**
- **1 contenu À propos**

## 🎉 Avantages du Système

### Pour le Développement
- **Rapide** : Pas de dépendance externe
- **Fiable** : Base de données locale stable
- **Testable** : Toutes les fonctionnalités disponibles
- **Sécurisé** : Données locales protégées

### Pour le Déploiement
- **Automatique** : Synchronisation en un clic
- **Fiable** : Export/import contrôlé
- **Traçable** : Scripts SQL générés
- **Flexible** : Workflow adaptatif

## 🚨 Points d'Attention

### Base de Données Locale
- Assurez-vous que MySQL est démarré
- Vérifiez que le port 3306 est libre
- Gardez le mot de passe sécurisé

### Synchronisation
- Testez toujours en local avant le déploiement
- Vérifiez les logs d'export
- Sauvegardez régulièrement vos données

### Déploiement
- Vérifiez que Vercel a accès à la base de données
- Testez le site en production après déploiement
- Surveillez les logs de déploiement

## 📝 Commandes Utiles

```bash
# Démarrer le développement
npm run dev

# Tester la création (si script disponible)
node test-local-creation.js

# Exporter les données
node export-local-data.js

# Déployer avec synchronisation
.\deploy-with-sync.ps1

# Vérifier les logs
Get-Content .env.local
```

## 🎯 Prochaines Étapes

1. **Créer du contenu** : Ajoutez vos vraies activités/actualités
2. **Tester complètement** : Vérifiez toutes les fonctionnalités
3. **Déployer** : Lancez le déploiement avec synchronisation
4. **Vérifier** : Testez le site en production
5. **Itérer** : Continuez le cycle de développement

## 🆘 Dépannage

### Problème de Connexion
```bash
# Vérifier MySQL
mysql -u root -p

# Vérifier le fichier .env.local
Get-Content .env.local
```

### Problème d'Export
```bash
# Vérifier la base de données
node export-local-data.js
```

### Problème de Déploiement
```bash
# Vérifier les logs
npm run build
git status
```

---

🎉 **Votre système de développement local est maintenant opérationnel !**

Vous pouvez créer des activités et actualités en local, puis les déployer automatiquement en ligne avec toutes les fonctionnalités intactes.
