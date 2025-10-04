# Configuration MySQL pour Association El BSF

## Prérequis

- Docker et Docker Compose installés
- Node.js et npm installés

## Installation et configuration

### 1. Démarrer MySQL avec Docker

```bash
# Démarrer les services MySQL et phpMyAdmin
docker-compose up -d

# Vérifier que les services sont démarrés
docker-compose ps
```

### 2. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```env
# Database
DATABASE_URL="mysql://root:password@localhost:3306/association_el_bsf"

# Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Générer le client Prisma

```bash
# Générer le client Prisma
npx prisma generate

# Créer et appliquer les migrations
npx prisma migrate dev --name init

# Seed la base de données avec des données d'exemple
node scripts/seed.js
```

### 4. Vérifier la connexion

- **MySQL**: accessible sur `localhost:3306`
- **phpMyAdmin**: accessible sur `http://localhost:8080`
  - Utilisateur: `root`
  - Mot de passe: `password`

## Structure de la base de données

### Table `activities`
- `id`: Identifiant unique (CUID)
- `title`: Titre de l'activité
- `description`: Description courte
- `longDescription`: Description détaillée
- `date`: Date de l'activité
- `time`: Heure de l'activité
- `location`: Lieu de l'activité
- `participants`: Participants ciblés
- `status`: Statut (UPCOMING, ONGOING, COMPLETED)
- `coverImage`: Image de couverture
- `images`: Galerie d'images (JSON)
- `videos`: Vidéos (JSON)
- `createdAt`: Date de création
- `updatedAt`: Date de mise à jour

### Table `content_blocks`
- `id`: Identifiant unique (CUID)
- `type`: Type de bloc (TITLE, PARAGRAPH, IMAGE_GALLERY)
- `content`: Contenu du bloc
- `style`: Styles CSS personnalisés
- `images`: Images du bloc (JSON)
- `order`: Ordre d'affichage
- `activityId`: Référence vers l'activité
- `createdAt`: Date de création
- `updatedAt`: Date de mise à jour

## Commandes utiles

```bash
# Ouvrir Prisma Studio (interface graphique)
npx prisma studio

# Réinitialiser la base de données
npx prisma migrate reset

# Voir le statut des migrations
npx prisma migrate status

# Générer une nouvelle migration
npx prisma migrate dev --name nom_de_la_migration
```

## Dépannage

### Erreur de connexion
- Vérifiez que MySQL est démarré : `docker-compose ps`
- Vérifiez les logs : `docker-compose logs mysql`
- Vérifiez que le port 3306 n'est pas utilisé par un autre service

### Erreur de migration
- Supprimez le dossier `.next` et `node_modules`
- Réinstallez les dépendances : `npm install`
- Régénérez le client Prisma : `npx prisma generate`
- Relancez les migrations : `npx prisma migrate dev`

## Arrêt des services

```bash
# Arrêter les services
docker-compose down

# Arrêter et supprimer les volumes (ATTENTION: supprime toutes les données)
docker-compose down -v
```
