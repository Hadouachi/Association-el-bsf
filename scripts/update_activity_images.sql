-- Script de mise à jour des images de couverture des activités
-- Ce script assigne des images par défaut aux activités qui n'en ont pas

-- Vérifier les activités sans image de couverture
SELECT id, title, coverImage FROM Activity WHERE coverImage IS NULL OR coverImage = '';

-- Mettre à jour les activités sans image de couverture
-- Utilise un modulo sur l'ID pour distribuer les 3 images par défaut
UPDATE Activity 
SET coverImage = CASE 
  WHEN (id % 3) = 0 THEN '/images/activity-cover3.jpg'
  WHEN (id % 3) = 1 THEN '/images/activity-cover1.jpg'
  WHEN (id % 3) = 2 THEN '/images/activity-cover2.jpg'
  ELSE '/images/activity-cover1.jpg'
END
WHERE coverImage IS NULL OR coverImage = '';

-- Vérifier le résultat
SELECT id, title, coverImage FROM Activity ORDER BY id;

-- Optionnel : Marquer les images comme images par défaut
-- Ajouter une colonne pour identifier les images par défaut
-- ALTER TABLE Activity ADD COLUMN isDefaultImage BOOLEAN DEFAULT FALSE;
-- UPDATE Activity SET isDefaultImage = TRUE WHERE coverImage LIKE '/images/activity-cover%.jpg';
