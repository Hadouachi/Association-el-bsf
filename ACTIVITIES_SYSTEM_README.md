# Système de Gestion des Activités - Association El BSF

## Vue d'ensemble

Le système de gestion des activités permet aux administrateurs de créer, modifier et supprimer des activités qui s'affichent automatiquement sur le site public. Toutes les activités sont persistées dans le localStorage du navigateur.

## Fonctionnalités

### ✅ Création d'activités
- Formulaire en 4 étapes pour une création guidée
- Upload d'images de couverture et de galerie
- Upload de vidéos avec posters
- Gestion des paragraphes avec images
- Validation des champs obligatoires

### ✅ Modification d'activités
- Édition de tous les champs existants
- Mise à jour des médias
- Conservation de l'historique

### ✅ Affichage public
- Liste des activités avec filtres (Toutes, À venir, Terminées)
- Page de détail pour chaque activité
- Affichage responsive et moderne

### ✅ Persistance des données
- Stockage automatique dans le localStorage
- Données conservées entre les sessions
- Synchronisation immédiate entre admin et public

## Structure des données

Chaque activité contient :

```typescript
interface Activity {
  id: string                    // Généré automatiquement
  title: string                 // Titre de l'activité
  description: string           // Description courte
  longDescription: string       // Description détaillée
  date: string                  // Date (format YYYY-MM-DD)
  time: string                  // Heure (ex: "14:00 à 18:00")
  location: string              // Lieu de l'activité
  participants: string          // Nombre de participants
  status: 'upcoming' | 'ongoing' | 'completed'
  coverImage: string            // Image de couverture
  images: string[]              // Galerie d'images
  videos: Array<{               // Vidéos avec métadonnées
    src: string
    title: string
    description: string
    poster: string
  }>
  paragraphs: string[]          // Paragraphes de contenu
  paragraphImages: string[]     // Images pour chaque paragraphe
  createdAt: string             // Date de création
  updatedAt: string             // Date de dernière modification
}
```

## Utilisation

### 1. Créer une activité

1. Aller sur `/admin/activities/add`
2. Remplir les informations de base (étape 1)
3. Ajouter le contenu détaillé (étape 2)
4. Uploader les médias (étape 3)
5. Vérifier l'aperçu (étape 4)
6. Cliquer sur "Créer l'activité"

### 2. Modifier une activité

1. Aller sur `/admin/activities`
2. Cliquer sur "Modifier" pour l'activité souhaitée
3. Modifier les champs nécessaires
4. Sauvegarder les modifications

### 3. Voir les activités publiques

1. Aller sur `/activities`
2. Utiliser les filtres pour naviguer
3. Cliquer sur une activité pour voir les détails

## Architecture technique

### Store Zustand
- **Fichier** : `lib/activitiesStore.ts`
- **Persistance** : localStorage via middleware `persist`
- **Fonctions** : `addActivity`, `updateActivity`, `deleteActivity`, `getActivity`

### Composants
- **FileUpload** : Gestion des uploads de fichiers
- **UploadedImage** : Affichage des images avec fallback
- **UploadedVideo** : Lecteur vidéo avec contrôles
- **Notification** : Système de notifications élégant

### Pages
- **Admin** : `/admin/activities/add`, `/admin/activities/edit/[id]`
- **Public** : `/activities`, `/activities/[id]`

## Avantages du système

1. **Synchronisation immédiate** : Les activités créées apparaissent instantanément sur le site public
2. **Interface intuitive** : Formulaire guidé en étapes pour une création facile
3. **Persistance locale** : Les données ne se perdent pas lors du rechargement
4. **Validation robuste** : Vérification des champs obligatoires
5. **Gestion des médias** : Support complet des images et vidéos
6. **Responsive design** : Interface adaptée à tous les écrans

## Dépannage

### Problème : Les activités ne s'affichent pas
- Vérifier que le localStorage n'est pas désactivé
- Vérifier la console du navigateur pour les erreurs
- S'assurer que le store Zustand est bien initialisé

### Problème : Upload de fichiers qui ne fonctionne pas
- Vérifier que les composants FileUpload sont bien configurés
- S'assurer que les types de fichiers sont acceptés
- Vérifier la taille des fichiers

### Problème : Persistance qui ne fonctionne pas
- Vérifier que le middleware `persist` est bien configuré
- S'assurer que le nom de la clé localStorage est unique
- Vérifier que le navigateur supporte localStorage

## Évolutions futures

- [ ] Intégration avec une base de données
- [ ] Système d'authentification robuste
- [ ] Gestion des permissions utilisateur
- [ ] API REST pour les opérations CRUD
- [ ] Système de cache et optimisation
- [ ] Gestion des catégories d'activités
- [ ] Système de recherche et filtres avancés
- [ ] Notifications push pour les nouvelles activités
- [ ] Export des données en PDF/Excel
- [ ] Système de commentaires et interactions

## Support

Pour toute question ou problème, consulter :
1. La console du navigateur pour les erreurs
2. Les logs du serveur de développement
3. La documentation Zustand et Next.js
4. Les composants UI pour les problèmes d'affichage

