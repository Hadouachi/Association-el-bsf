USE association_el_bsf;

-- Table des activités
CREATE TABLE IF NOT EXISTS Activity (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    longDescription TEXT,
    date VARCHAR(255),
    time VARCHAR(255),
    location VARCHAR(255),
    participants VARCHAR(255),
    status ENUM('upcoming', 'ongoing', 'completed'),
    coverImage VARCHAR(500),
    images JSON,
    videos JSON,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des blocs de contenu
CREATE TABLE IF NOT EXISTS ContentBlock (
    id VARCHAR(255) PRIMARY KEY,
    activityId VARCHAR(255),
    type ENUM('title', 'paragraph', 'image-gallery'),
    content TEXT,
    style VARCHAR(100),
    images JSON,
    `order` INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (activityId) REFERENCES Activity(id) ON DELETE CASCADE
);

-- Index pour améliorer les performances
CREATE INDEX idx_activity_status ON Activity(status);
CREATE INDEX idx_activity_date ON Activity(date);
CREATE INDEX idx_contentblock_activity ON ContentBlock(activityId);
CREATE INDEX idx_contentblock_order ON ContentBlock(`order`);

