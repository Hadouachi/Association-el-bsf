-- Script pour supprimer le champ videos des activités
-- Ce script nettoie les données des activités en supprimant les vidéos ajoutées en dehors des blocs personnalisés

-- Vérifier la structure actuelle
DESCRIBE Activity;

-- Supprimer le champ videos s'il existe
-- Note: Cette commande peut ne pas fonctionner selon la version de MySQL
-- ALTER TABLE Activity DROP COLUMN videos;

-- Alternative: Mettre à jour le champ videos à NULL pour toutes les activités
UPDATE Activity SET videos = NULL WHERE videos IS NOT NULL;

-- Vérifier que le champ est maintenant NULL
SELECT id, title, videos FROM Activity LIMIT 5;

-- Optionnel: Créer une vue pour vérifier les activités sans vidéos
CREATE OR REPLACE VIEW activities_without_videos AS
SELECT id, title, description, date, location, status, coverImage, images, contentBlocks
FROM Activity;

-- Vérifier la vue
SELECT * FROM activities_without_videos LIMIT 5;

-- Message de confirmation
SELECT 'Migration terminée: Champ videos supprimé des activités' AS status;





