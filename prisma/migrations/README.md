# Migrations Prisma

Ce dossier contient les migrations de base de données générées par Prisma.

## Qu'est-ce qu'une migration ?

Une migration est un fichier SQL qui décrit les changements à apporter à la structure de votre base de données.

## Commandes utiles

### Créer une nouvelle migration
```bash
npm run db:migrate
```

### Appliquer les migrations
```bash
npm run db:migrate
```

### Réinitialiser la base de données
```bash
npm run db:reset
```

### Voir le statut des migrations
```bash
npx prisma migrate status
```

## Structure des migrations

Chaque migration contient :
- `migration.sql` : Le code SQL à exécuter
- `migration_lock.toml` : Verrou pour éviter les conflits

## Bonnes pratiques

1. **Toujours tester** les migrations sur un environnement de développement
2. **Sauvegarder** la base de données avant d'appliquer des migrations en production
3. **Vérifier** que les migrations sont réversibles si possible
4. **Documenter** les changements importants

## Dépannage

### Erreur de migration
- Vérifiez que la base de données est accessible
- Vérifiez que les privilèges sont suffisants
- Consultez les logs d'erreur

### Migration en échec
- Utilisez `npx prisma migrate resolve --rolled-back <migration_name>` pour marquer comme résolue
- Ou utilisez `npm run db:reset` pour tout recommencer (⚠️ ATTENTION: supprime toutes les données)

