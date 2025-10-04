# Association El BSF - Site Web

Site web moderne et responsive pour l'association de mémorisation du Coran Karim El BSF.

## 🎯 Objectifs

- Présenter l'association et ses activités
- Afficher les programmes de mémorisation
- Publier les actualités et événements
- Permettre le contact avec l'association
- Support multilingue (Français, Anglais, Arabe)

## 🚀 Technologies Utilisées

### Frontend
- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique pour la sécurité
- **Tailwind CSS** - Framework CSS utilitaire
- **next-intl** - Internationalisation
- **Lucide React** - Icônes modernes

### Backend (Prévu)
- **Next.js API Routes** - API RESTful
- **Prisma ORM** - Gestion de base de données
- **PostgreSQL/MySQL** - Base de données
- **NextAuth.js** - Authentification

## 📁 Structure du Projet

```
Association-el-bsf/
├── app/                    # Pages Next.js (App Router)
│   ├── [locale]/          # Pages avec support multilingue
│   ├── globals.css        # Styles globaux
│   └── layout.tsx         # Layout principal
├── components/            # Composants réutilisables
│   ├── layout/           # Header, Footer
│   ├── ui/               # Composants UI de base
│   └── sections/         # Sections de pages
├── messages/             # Fichiers de traduction
│   ├── fr.json          # Français
│   ├── en.json          # Anglais
│   └── ar.json          # Arabe
├── public/               # Assets statiques
└── types/                # Types TypeScript
```

## 🛠️ Installation

1. **Cloner le projet**
```bash
git clone [url-du-repo]
cd Association-el-bsf
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 🌐 Pages Disponibles

- **Accueil** (`/`) - Présentation de l'association
- **À propos** (`/about`) - Mission, vision, valeurs
- **Activités** (`/activities`) - Activités passées et à venir
- **Actualités** (`/news`) - Articles et événements
- **Programmes** (`/programs`) - Programmes de mémorisation
- **Contact** (`/contact`) - Formulaire de contact

## 🎨 Design System

### Couleurs
- **Primary** : Bleu (#0ea5e9) - Couleur principale
- **Secondary** : Jaune (#eab308) - Couleur secondaire
- **Islamic Green** : Vert (#22c55e) - Éléments islamiques
- **Gold** : Or (#f59e0b) - Accents dorés

### Typographie
- **Inter** - Police principale (Latin)
- **Noto Sans Arabic** - Police arabe

### Responsive
- **Mobile First** - Design adaptatif
- **Breakpoints** : sm (640px), md (768px), lg (1024px), xl (1280px)

## 🌍 Internationalisation

Le site supporte 3 langues :
- **Français** (par défaut)
- **Anglais**
- **Arabe** (avec support RTL)

### Ajouter une nouvelle traduction

1. Ajouter la clé dans `messages/fr.json`
2. Traduire dans `messages/en.json`
3. Traduire dans `messages/ar.json`

## 📱 Fonctionnalités

### ✅ Implémentées
- [x] Structure de base Next.js
- [x] Support multilingue
- [x] Header responsive avec navigation
- [x] Footer avec liens et contact
- [x] Page d'accueil avec sections
- [x] Design system avec Tailwind
- [x] Composants réutilisables

### 🚧 En cours
- [ ] Pages individuelles (About, Activities, etc.)
- [ ] Système de blog/actualités
- [ ] Formulaire de contact fonctionnel
- [ ] Galerie de médias

### 📋 À venir
- [ ] Backend avec API
- [ ] Base de données
- [ ] Système d'authentification
- [ ] Panel d'administration
- [ ] Système de newsletter
- [ ] Intégration réseaux sociaux

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm run build
vercel --prod
```

### Autres plateformes
- **Netlify** - Compatible Next.js
- **Railway** - Déploiement simple
- **DigitalOcean** - VPS personnalisé

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Contact

- **Email** : contact@elbsf.org
- **Téléphone** : +33 1 23 45 67 89
- **Adresse** : 123 Rue de la Mosquée, Ville

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Association El BSF** - Dédiée à la mémorisation du Coran Karim 🕌 