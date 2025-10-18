-- Script pour supprimer les vidéos de l'activité "Champion Akhachab Amghar"
-- Ce script nettoie les vidéos des blocs de contenu personnalisés de cette activité spécifique

-- Vérifier l'activité cible
SELECT id, title, contentBlocks FROM Activity WHERE title LIKE '%Champion Akhachab Amghar%';

-- Mettre à jour les blocs de contenu pour supprimer les vidéos
-- Note: Cette commande met à jour le champ contentBlocks en supprimant les vidéos
UPDATE Activity 
SET contentBlocks = JSON_REMOVE(contentBlocks, '$[*].videos')
WHERE title LIKE '%Champion Akhachab Amghar%';

-- Alternative: Mettre à jour manuellement si JSON_REMOVE ne fonctionne pas
-- UPDATE Activity 
-- SET contentBlocks = '[]'
-- WHERE title LIKE '%Champion Akhachab Amghar%';

-- Vérifier le résultat
SELECT id, title, contentBlocks FROM Activity WHERE title LIKE '%Champion Akhachab Amghar%';

-- Message de confirmation
SELECT 'Vidéos supprimées de l\'activité Champion Akhachab Amghar' AS status;






