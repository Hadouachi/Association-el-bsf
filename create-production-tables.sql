-- Script de création des tables pour la base de production
-- Association El BSF

-- Table des activités
CREATE TABLE IF NOT EXISTS Activity (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  location VARCHAR(255),
  coverImage VARCHAR(500),
  images JSON,
  videos JSON,
  contentBlocks JSON,
  status ENUM('draft', 'published') DEFAULT 'draft',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des actualités
CREATE TABLE IF NOT EXISTS News (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image VARCHAR(500),
  category VARCHAR(100) NOT NULL,
  author VARCHAR(255) NOT NULL,
  status ENUM('draft', 'published') DEFAULT 'draft',
  publishedAt TIMESTAMP NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table du contenu À propos
CREATE TABLE IF NOT EXISTS AboutContent (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  description TEXT,
  coverImage VARCHAR(500),
  status ENUM('draft', 'published') DEFAULT 'draft',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des blocs de contenu (pour la page À propos)
CREATE TABLE IF NOT EXISTS ContentBlocks (
  id VARCHAR(36) PRIMARY KEY,
  aboutContentId VARCHAR(36),
  type ENUM('TEXT', 'HEADING', 'IMAGE_GALLERY', 'VIDEO_GALLERY') NOT NULL,
  title VARCHAR(255),
  content TEXT,
  images JSON,
  videos JSON,
  settings JSON,
  order_index INT DEFAULT 0,
  isActive BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (aboutContentId) REFERENCES AboutContent(id) ON DELETE CASCADE
);

-- Index pour améliorer les performances
CREATE INDEX idx_activity_status ON Activity(status);
CREATE INDEX idx_activity_date ON Activity(date);
CREATE INDEX idx_news_status ON News(status);
CREATE INDEX idx_news_published ON News(publishedAt);
CREATE INDEX idx_about_status ON AboutContent(status);
CREATE INDEX idx_blocks_about ON ContentBlocks(aboutContentId);
CREATE INDEX idx_blocks_order ON ContentBlocks(order_index);
