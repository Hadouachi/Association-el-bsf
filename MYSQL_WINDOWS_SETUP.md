# Installation MySQL sur Windows pour Association El BSF

## Option 1: Installation directe de MySQL (Recommandée)

### 1. Télécharger MySQL Installer

1. Allez sur [MySQL Downloads](https://dev.mysql.com/downloads/installer/)
2. Téléchargez "MySQL Installer for Windows"
3. Choisissez la version "mysql-installer-community" (plus légère)

### 2. Installer MySQL

1. Exécutez le fichier téléchargé en tant qu'administrateur
2. Choisissez "Developer Default" ou "Server only"
3. Suivez l'assistant d'installation
4. **IMPORTANT**: Notez le mot de passe root que vous définissez
5. Laissez le port par défaut (3306)

### 3. Vérifier l'installation

1. Ouvrez "Services" (services.msc)
2. Vérifiez que "MySQL80" ou "MySQL" est démarré
3. Ou utilisez la commande : `net start MySQL80`

## Option 2: Installation via XAMPP (Alternative)

### 1. Télécharger XAMPP

1. Allez sur [Apache Friends](https://www.apachefriends.org/)
2. Téléchargez XAMPP pour Windows
3. Installez XAMPP

### 2. Démarrer MySQL

1. Ouvrez le panneau de contrôle XAMPP
2. Démarrez MySQL
3. Cliquez sur "Admin" pour ouvrir phpMyAdmin

## Configuration de la base de données

### 1. Créer la base de données

1. Ouvrez MySQL Workbench ou phpMyAdmin
2. Connectez-vous avec l'utilisateur root
3. Exécutez la commande SQL :
```sql
CREATE DATABASE association_el_bsf CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Créer un utilisateur (optionnel mais recommandé)

```sql
CREATE USER 'association_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON association_el_bsf.* TO 'association_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
# Database - Remplacez par vos informations
DATABASE_URL="mysql://root:votre_mot_de_passe@localhost:3306/association_el_bsf"

# Ou si vous avez créé un utilisateur :
# DATABASE_URL="mysql://association_user:votre_mot_de_passe@localhost:3306/association_el_bsf"

# Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

## Configuration du projet

### 1. Générer le client Prisma

```bash
# Générer le client Prisma
npx prisma generate

# Créer et appliquer les migrations
npx prisma migrate dev --name init

# Seed la base de données avec des données d'exemple
node scripts/seed.js
```

### 2. Vérifier la connexion

```bash
# Ouvrir Prisma Studio (interface graphique)
npx prisma studio
```

## Dépannage

### Erreur de connexion
- Vérifiez que MySQL est démarré
- Vérifiez le mot de passe dans le fichier `.env`
- Vérifiez que le port 3306 n'est pas utilisé par un autre service

### Erreur "Access denied"
- Vérifiez les privilèges de l'utilisateur
- Essayez de vous connecter avec l'utilisateur root

### Erreur de migration
- Supprimez le dossier `.next` et `node_modules`
- Réinstallez les dépendances : `npm install`
- Régénérez le client Prisma : `npx prisma generate`
- Relancez les migrations : `npx prisma migrate dev`

## Commandes utiles

```bash
# Vérifier le statut de MySQL
net start MySQL80
net stop MySQL80

# Ouvrir MySQL en ligne de commande
mysql -u root -p

# Ouvrir Prisma Studio
npx prisma studio

# Réinitialiser la base de données
npx prisma migrate reset

# Voir le statut des migrations
npx prisma migrate status
```

## Structure de la base de données

Après la migration, vous aurez deux tables :

### `activities`
- Stocke toutes les informations des activités
- Relation one-to-many avec `content_blocks`

### `content_blocks`
- Stocke les blocs de contenu personnalisables
- Chaque bloc peut être un titre, paragraphe ou galerie d'images
- Ordre d'affichage configurable
- Styles CSS personnalisables

