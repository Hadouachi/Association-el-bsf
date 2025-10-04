# 🕌 Association El BSF

Site web officiel de l'Association El BSF - Organisation dédiée à la promotion de l'éducation islamique et à la mémorisation du Coran.

## 🌟 Fonctionnalités

- **Page d'accueil** avec carousel d'actualités dynamique
- **Gestion des activités** (CRUD complet)
- **Gestion des actualités** (CRUD complet) 
- **Gestion de la page À propos** (CRUD complet)
- **Interface d'administration** complète
- **Upload d'images et vidéos**
- **Design responsive** adapté mobile et desktop
- **Internationalisation** (Français/Anglais)

## 🚀 Technologies

- **Next.js 14** avec App Router
- **TypeScript** pour la sécurité des types
- **Tailwind CSS** pour le styling
- **Zustand** pour la gestion d'état
- **MySQL** pour la base de données
- **Next-intl** pour l'internationalisation

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/Association-el-bsf.git

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Démarrer le serveur de développement
npm run dev
```

## 🗄️ Base de données

1. Créer une base de données MySQL `association_el_bsf`
2. Exécuter le script `create-production-tables.sql`
3. Importer les données avec `database-import.sql`

## 🌐 Déploiement

Le site est configuré pour être déployé sur Vercel :

1. Pousser le code sur GitHub
2. Connecter le repository à Vercel
3. Configurer les variables d'environnement
4. Déployer automatiquement

Voir `DEPLOYMENT_GUIDE.md` pour les instructions détaillées.

## 📁 Structure du projet

```
├── app/                    # Pages Next.js (App Router)
│   ├── [locale]/          # Pages internationalisées
│   ├── api/               # API Routes
│   └── globals.css        # Styles globaux
├── components/            # Composants réutilisables
├── lib/                   # Stores et utilitaires
├── public/                # Fichiers statiques
└── types/                 # Définitions TypeScript
```

## 🎯 Pages principales

- **Accueil** : `/` - Présentation et actualités
- **Activités** : `/activities` - Liste des activités
- **Actualités** : `/news` - Articles et nouvelles
- **À propos** : `/about` - Informations sur l'association
- **Admin** : `/admin` - Interface d'administration

## 🔧 Scripts disponibles

```bash
npm run dev          # Développement
npm run build        # Build de production
npm run start        # Démarrage en production
npm run lint         # Vérification du code
```

## 📞 Support

Pour toute question ou problème, contactez l'équipe technique.

---

**Association El BSF** - Promouvoir l'éducation islamique de qualité 🕌