# Guide pour l'Image de Bannière - Association El BSF

## 📏 Dimensions Recommandées

### **Desktop (PC) :**
- **Largeur :** 1920px
- **Hauteur :** 600px à 800px
- **Format :** JPG ou WebP
- **Poids :** Maximum 500KB
- **Résolution :** 72 DPI (pour le web)

### **Mobile :**
- **Largeur :** 768px
- **Hauteur :** 400px à 500px
- **Format :** Même format que desktop
- **Poids :** Maximum 200KB

## 🎨 Spécifications Techniques

### **Qualité d'Image :**
- **Format préféré :** WebP (meilleure compression)
- **Format alternatif :** JPG (compatibilité maximale)
- **Compression :** 80-90% pour un bon équilibre qualité/poids

### **Contenu Recommandé :**
- **Sujet :** Mosquée, Coran, étudiants en prière, calligraphie arabe
- **Couleurs :** Harmonie avec les couleurs du site (bleu, vert, doré)
- **Style :** Moderne, professionnel, respectueux
- **Contraste :** Suffisant pour la lisibilité du texte blanc

## 📱 Technique Responsive

### **Approche Multi-Images :**
```html
<!-- Desktop -->
<Image
  src="/images/hero-banner-desktop.jpg"
  alt="Bannière desktop"
  fill
  className="hidden md:block"
  sizes="100vw"
/>

<!-- Mobile -->
<Image
  src="/images/hero-banner-mobile.jpg"
  alt="Bannière mobile"
  fill
  className="block md:hidden"
  sizes="100vw"
/>
```

### **Approche Single Image (Recommandée) :**
```html
<Image
  src="/images/hero-banner.jpg"
  alt="Association El BSF"
  fill
  className="object-cover object-center"
  sizes="100vw"
  quality={90}
/>
```

## 🛠️ Optimisation

### **Next.js Image Optimization :**
- **Priority :** `true` pour la bannière (LCP)
- **Quality :** 90 pour une qualité optimale
- **Sizes :** `100vw` pour responsive
- **Formats :** WebP et AVIF automatiques

### **CSS Responsive :**
```css
.hero-banner {
  height: 100vh;
  min-height: 600px;
  max-height: 800px;
}

@media (max-width: 768px) {
  .hero-banner {
    min-height: 500px;
    max-height: 600px;
  }
}
```

## 📁 Structure des Fichiers

```
public/
└── images/
    ├── hero-banner.jpg          # Image principale (1920x800px)
    ├── hero-banner-mobile.jpg   # Version mobile (768x500px)
    └── hero-banner.webp         # Version WebP (optionnel)
```

## 🎯 Points d'Attention

### **Mobile :**
- **Zone de sécurité :** Gardez le texte important au centre
- **Taille de texte :** Utilisez `clamp()` pour l'adaptation
- **Boutons :** Suffisamment grands pour le touch (44px minimum)

### **Performance :**
- **Lazy loading :** Désactivé pour la bannière (priority)
- **Preload :** Considérez le preload pour les images critiques
- **CDN :** Utilisez un CDN pour les images

### **Accessibilité :**
- **Alt text :** Descriptif et pertinent
- **Contraste :** Minimum 4.5:1 pour le texte
- **Focus :** Visible sur les boutons

## 🔧 Intégration

1. **Placez l'image** dans `public/images/`
2. **Mettez à jour le chemin** dans `app/[locale]/page.tsx`
3. **Testez** sur différents appareils
4. **Optimisez** selon les performances

## 📊 Métriques de Performance

### **Objectifs :**
- **LCP (Largest Contentful Paint) :** < 2.5s
- **CLS (Cumulative Layout Shift) :** < 0.1
- **FID (First Input Delay) :** < 100ms

### **Outils de Test :**
- Google PageSpeed Insights
- Lighthouse
- WebPageTest

## 🎨 Suggestions de Design

### **Thèmes Visuels :**
1. **Mosquée moderne** avec architecture islamique
2. **Coran ouvert** avec calligraphie arabe
3. **Étudiants en prière** ou en cours
4. **Motifs géométriques** islamiques
5. **Calligraphie** du nom de l'association

### **Palette de Couleurs :**
- **Bleu principal :** #2563eb
- **Vert islamique :** #10b981
- **Doré :** #f59e0b
- **Blanc :** #ffffff
- **Gris foncé :** #1f2937

## 📱 Test Responsive

### **Breakpoints à Tester :**
- **Mobile :** 320px - 768px
- **Tablet :** 768px - 1024px
- **Desktop :** 1024px - 1920px+
- **Large Desktop :** 1920px+

### **Aspects à Vérifier :**
- Lisibilité du texte
- Taille des boutons
- Espacement des éléments
- Performance de chargement
- Accessibilité 