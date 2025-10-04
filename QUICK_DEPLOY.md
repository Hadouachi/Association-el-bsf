# 🚀 Déploiement Rapide - Association El BSF

## ✅ Le projet est prêt !

Votre site est maintenant prêt pour être mis en ligne. Voici les étapes simples :

## 1. 📤 Créer un repository GitHub

1. Aller sur [github.com](https://github.com)
2. Cliquer sur "New repository"
3. Nom : `Association-el-bsf`
4. Description : `Site web officiel de l'Association El BSF`
5. Cocher "Public"
6. Cliquer "Create repository"

## 2. 🔗 Connecter le projet local à GitHub

```bash
# Ajouter le remote GitHub
git remote add origin https://github.com/VOTRE-USERNAME/Association-el-bsf.git

# Pousser le code
git branch -M main
git push -u origin main
```

## 3. 🌐 Déployer sur Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter avec GitHub
3. Cliquer "Import Project"
4. Sélectionner `Association-el-bsf`
5. Cliquer "Deploy"

## 4. ⚙️ Configurer la base de données

### Option A : PlanetScale (Gratuit)
1. Créer un compte sur [planetscale.com](https://planetscale.com)
2. Créer une base de données `association_el_bsf`
3. Exécuter le script `create-production-tables.sql`
4. Importer les données avec `database-import.sql`

### Option B : Railway (Gratuit)
1. Créer un compte sur [railway.app](https://railway.app)
2. Créer un service MySQL
3. Exécuter le script `create-production-tables.sql`
4. Importer les données avec `database-import.sql`

## 5. 🔧 Variables d'environnement dans Vercel

Dans Vercel Dashboard > Settings > Environment Variables :

```env
DB_HOST=votre_host_mysql
DB_USER=votre_username
DB_PASSWORD=votre_password
DB_NAME=association_el_bsf
DB_PORT=3306
NEXTAUTH_SECRET=votre_secret_aleatoire_32_caracteres
NEXTAUTH_URL=https://votre-domaine.vercel.app
```

## 6. 🔄 Redéployer

Après avoir configuré les variables :
1. Aller dans Vercel Dashboard > Deployments
2. Cliquer "Redeploy" sur le dernier déploiement

## 🎉 C'est fait !

Votre site sera accessible à : `https://association-el-bsf.vercel.app`

## 📋 Checklist finale

- [ ] Repository GitHub créé
- [ ] Code poussé sur GitHub
- [ ] Projet importé dans Vercel
- [ ] Base de données configurée
- [ ] Variables d'environnement ajoutées
- [ ] Site redéployé
- [ ] Site testé et fonctionnel

## 🆘 Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Vérifier les logs dans Vercel Dashboard
2. S'assurer que la base de données est accessible
3. Vérifier que toutes les variables d'environnement sont correctes

**Votre site Association El BSF sera bientôt en ligne ! 🚀**
