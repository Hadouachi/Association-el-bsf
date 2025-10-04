-- Script pour créer la table AboutContent
-- Cette table gère le contenu personnalisable de la page À propos

-- Créer la table AboutContent
CREATE TABLE IF NOT EXISTS AboutContent (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  type ENUM('ANNOUNCEMENT', 'WORK_PROJECT', 'INFORMATION', 'MILESTONE', 'PARTNERSHIP') NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  images JSON,
  videos JSON,
  `order` INT DEFAULT 0,
  isPublished BOOLEAN DEFAULT TRUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Créer un index sur le type et l'ordre pour optimiser les requêtes
CREATE INDEX idx_about_content_type ON AboutContent(type);
CREATE INDEX idx_about_content_order ON AboutContent(`order`);
CREATE INDEX idx_about_content_published ON AboutContent(isPublished);

-- Insérer quelques exemples de contenu
INSERT INTO AboutContent (id, type, title, content, `order`, isPublished) VALUES
('about-1', 'MILESTONE', 'Fondation de l\'association', 'L\'association El BSF a été fondée en 2020 avec pour mission de promouvoir le développement social et culturel de la communauté.', 1, TRUE),
('about-2', 'WORK_PROJECT', 'Projet éducatif 2023', 'Mise en place d\'un programme de soutien scolaire pour 50 enfants de la région.', 2, TRUE),
('about-3', 'ANNOUNCEMENT', 'Nouveau partenariat', 'L\'association a signé un partenariat avec la municipalité pour le développement des activités culturelles.', 3, TRUE);

-- Vérifier la création
DESCRIBE AboutContent;
SELECT * FROM AboutContent ORDER BY `order`;

