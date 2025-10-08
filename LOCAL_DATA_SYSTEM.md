# Système de Données Locales

Ce système permet au site de fonctionner avec des données statiques locales, même sans connexion à une base de données.

## 🎯 Objectif

- **Fonctionnement autonome** : Le site reste opérationnel même si la base de données n'est pas accessible
- **Médias statiques** : Images et vidéos intégrées directement dans le projet
- **Fallback intelligent** : L'API est tentée en premier, puis les données locales sont utilisées

## 📁 Structure

```
data/
├── localActivities.ts          # Données des activités
public/
├── images/activities/          # Images statiques des activités
│   ├── formation-web.svg
│   ├── sensibilisation.svg
│   └── ...
└── videos/activities/          # Vidéos statiques des activités
    ├── formation-preview.html
    ├── sensibilisation-campagne.html
    └── ...
```

## 🔧 Fonctionnement

### 1. Store Zustand Modifié

Le store `lib/activitiesStore.ts` a été modifié pour :
- Essayer d'abord l'API `/api/activities`
- En cas d'échec, utiliser les données locales
- Fonctionner de manière transparente

### 2. Données Locales

Le fichier `data/localActivities.ts` contient :
- 5 activités d'exemple complètes
- Images de couverture et galeries
- Vidéos avec posters
- Blocs de contenu variés

### 3. Médias Statiques

- **Images** : Fichiers SVG placeholder (à remplacer par de vraies images)
- **Vidéos** : Fichiers HTML placeholder (à remplacer par de vraies vidéos MP4)

## 🚀 Déploiement

### Script Automatique

```powershell
.\deploy-with-local-data.ps1
```

Ce script :
1. Vérifie les données locales
2. Nettoie les fichiers temporaires
3. Installe les dépendances
4. Construit le projet
5. Pousse vers GitHub
6. Déploie automatiquement sur Vercel

### Déploiement Manuel

```bash
# 1. Installer les dépendances
npm install

# 2. Construire le projet
npm run build

# 3. Pousser vers GitHub
git add .
git commit -m "feat: Système de données locales"
git push origin main
```

## 🧪 Test

### Test Local

```bash
# Lancer le serveur
npm run dev

# Visiter les pages
http://localhost:3000/fr/activities
http://localhost:3000/fr/activities/1
```

### Vérification

Le système fonctionne si :
- ✅ Les activités s'affichent sur `/fr/activities`
- ✅ Les détails s'affichent sur `/fr/activities/[id]`
- ✅ Les images et vidéos sont visibles
- ✅ Le site fonctionne sans base de données

## 📝 Personnalisation

### Ajouter une Activité

1. Modifier `data/localActivities.ts`
2. Ajouter les médias dans `public/images/activities/` et `public/videos/activities/`
3. Redéployer

### Remplacer les Médias

1. **Images** : Remplacer les fichiers `.svg` par de vraies images `.jpg` ou `.png`
2. **Vidéos** : Remplacer les fichiers `.html` par de vraies vidéos `.mp4`

### Modifier le Comportement

- **API uniquement** : Supprimer le fallback dans `fetchActivities()`
- **Local uniquement** : Désactiver l'appel API
- **Hybride** : Modifier la logique de fallback

## 🔍 Debug

### Logs Console

Le système affiche des logs pour :
- `🔄 Récupération des activités...`
- `✅ Activités récupérées depuis l'API: X`
- `⚠️ API non disponible, utilisation des données locales`
- `✅ Activités chargées depuis les données locales: X`

### Vérification des Médias

```bash
# Vérifier les images
ls public/images/activities/

# Vérifier les vidéos
ls public/videos/activities/
```

## 🎉 Avantages

- **Fiabilité** : Site toujours fonctionnel
- **Performance** : Chargement rapide des médias statiques
- **Simplicité** : Pas de dépendance externe
- **Flexibilité** : Facile à personnaliser
- **Déploiement** : Fonctionne sur n'importe quelle plateforme

## 📋 Checklist Déploiement

- [ ] Données locales créées
- [ ] Store modifié pour fallback
- [ ] Médias statiques ajoutés
- [ ] Tests locaux réussis
- [ ] Build réussi
- [ ] Push vers GitHub
- [ ] Déploiement Vercel vérifié
- [ ] Site fonctionnel en production
