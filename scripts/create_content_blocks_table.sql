-- Créer la table pour les blocs de contenu flexibles
CREATE TABLE IF NOT EXISTS ContentBlocks (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  aboutContentId VARCHAR(255) NOT NULL,
  type ENUM('TEXT', 'IMAGE_GALLERY', 'VIDEO_GALLERY', 'HEADING', 'DIVIDER', 'BUTTON', 'QUOTE', 'STATS') NOT NULL,
  title VARCHAR(255),
  content TEXT,
  images JSON,
  videos JSON,
  settings JSON,
  order_index INT DEFAULT 0,
  isActive BOOLEAN DEFAULT TRUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (aboutContentId) REFERENCES aboutcontent(id) ON DELETE CASCADE,
  INDEX idx_about_content_order (aboutContentId, order_index)
);

-- Insérer des exemples de blocs
INSERT INTO ContentBlocks (id, aboutContentId, type, title, content, order_index) VALUES
('block-1', 'about-1', 'HEADING', 'Notre Mission', 'Découvrez ce qui nous anime', 0),
('block-2', 'about-1', 'TEXT', 'Description', 'L\'association El BSF a été fondée en 2020 avec pour mission de promouvoir le développement social et culturel de notre communauté.', 1),
('block-3', 'about-1', 'IMAGE_GALLERY', 'Galerie Photos', 'Quelques moments forts de notre association', 2);






