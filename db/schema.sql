--- schema of schools table
CREATE TABLE IF NOT EXISTS Schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT(10, 6) NOT NULL,
    longitude FLOAT(10, 6) NOT NULL
);
