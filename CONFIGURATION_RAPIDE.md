# 🚀 Configuration Rapide - Résoudre l'erreur DATABASE_URL

## ❌ **Erreur actuelle :**
```
Error: Environment variable not found: DATABASE_URL.
```

## ✅ **Solution en 3 étapes :**

### 1️⃣ **Créer le fichier `.env.local`**
Créez un fichier `.env.local` à la racine du projet avec ce contenu :

```bash
# Configuration de la base de données MySQL
DATABASE_URL="mysql://root:password@localhost:3306/association_el_bsf"

# Configuration NextAuth
NEXTAUTH_SECRET="votre-secret-ici-changez-le-en-production"

# Configuration Prisma
PRISMA_LOG_QUERIES="true"
PRISMA_LOG_ERRORS="true"
```

### 2️⃣ **Installer et configurer MySQL**

#### Option A : XAMPP (Recommandé pour Windows)
1. Téléchargez XAMPP : https://www.apachefriends.org/
2. Installez XAMPP
3. Démarrez Apache et MySQL
4. Créez la base de données `association_el_bsf` via phpMyAdmin

#### Option B : MySQL Installer
1. Téléchargez MySQL : https://dev.mysql.com/downloads/installer/
2. Installez MySQL Server
3. Créez la base de données `association_el_bsf`

### 3️⃣ **Initialiser la base de données**
```bash
# Générer le client Prisma
npm run db:generate

# Créer les tables
npm run db:migrate

# Peupler avec des données d'exemple
npm run db:seed
```

## 🔄 **Redémarrer l'application**
```bash
npm run dev
```

## ✅ **Résultat attendu :**
- Plus d'erreur `DATABASE_URL`
- Création d'activités fonctionnelle
- Base de données persistante

## 🆘 **Si vous avez des problèmes :**
1. Vérifiez que MySQL est démarré
2. Vérifiez que la base de données existe
3. Vérifiez que le fichier `.env.local` est bien créé
4. Redémarrez le serveur de développement

