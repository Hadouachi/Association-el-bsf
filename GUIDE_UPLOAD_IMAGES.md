# Guide d'utilisation des images uploadées

## 🖼️ Comment fonctionne le système d'upload d'images

### ✅ Problème résolu
Les images que vous uploadez dans l'admin sont maintenant correctement affichées sur le site web grâce à un système de gestion robuste.

### 🔧 Composants créés

#### 1. **UploadedImage** (`components/ui/UploadedImage.tsx`)
- Gère l'affichage des images uploadées (blob URLs)
- Gère l'affichage des images statiques (fichiers dans `/public`)
- Affiche un fallback si l'image ne charge pas
- Indicateur de chargement

#### 2. **UploadedVideo** (`components/ui/UploadedVideo.tsx`)
- Gère l'affichage des vidéos uploadées
- Support des posters
- Gestion d'erreur et fallback

### 📁 Fonctions du store

#### `processUploadedFiles(files: File[])`
- Convertit les fichiers en URLs persistantes
- Stocke les URLs dans le localStorage
- Retourne un tableau d'URLs

#### `processUploadedVideo(file: File, index: number)`
- Traite une vidéo uploadée
- Crée une structure avec src, title, description, poster
- Retourne un objet vidéo complet

### 🎯 Utilisation

#### Dans l'admin (ajout d'activité) :
```typescript
const { addActivity, processUploadedFiles, processUploadedVideo } = useActivitiesStore()

// Pour les images
coverImage: coverImageFile ? processUploadedFiles([coverImageFile])[0] : '/images/default.jpg',
images: processUploadedFiles(galleryFiles),

// Pour les vidéos
videos: videoFiles.map((file, index) => processUploadedVideo(file, index)),
```

#### Dans l'affichage :
```typescript
import UploadedImage from '@/components/ui/UploadedImage'

// Au lieu de <Image>
<UploadedImage
  src={activity.coverImage}
  alt={activity.title}
  fill
  className="object-cover"
/>
```

### 🔄 Pages mises à jour

✅ **Page d'accueil** - Utilise `UploadedImage` pour les activités récentes
✅ **Page des activités** - Utilise `UploadedImage` pour les cartes d'activités  
✅ **Page de détail** - Utilise `UploadedImage` pour l'image de couverture
✅ **Admin - Gestion** - Utilise `UploadedImage` pour les aperçus

### 🚀 Avantages

1. **Persistance** : Les images restent visibles après rechargement
2. **Gestion d'erreur** : Fallback si l'image ne charge pas
3. **Performance** : Optimisation pour les images statiques et uploadées
4. **UX** : Indicateurs de chargement et messages d'erreur clairs

### 📝 Notes importantes

- Les images uploadées sont stockées comme blob URLs
- Le localStorage garde une référence aux URLs
- Les images statiques dans `/public` continuent de fonctionner normalement
- Le système gère automatiquement les deux types d'images

### 🧪 Test

1. Allez dans l'admin : `/admin/activities/add`
2. Uploadez une image de couverture
3. Uploadez des images de galerie
4. Créez l'activité
5. Vérifiez que les images s'affichent sur :
   - Page d'accueil
   - Page des activités
   - Page de détail de l'activité
   - Admin - Gestion des activités

Les images uploadées devraient maintenant s'afficher correctement partout ! 🎉 