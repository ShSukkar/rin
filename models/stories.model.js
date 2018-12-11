module.exports = `
  CREATE TABLE IF NOT EXISTS stories(
    id INT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    pre_description VARCHAR(3000) NOT NULL,
    text VARCHAR(10000),
    lens VARCHAR(255) NOT NULL,
    SDGs JSON,
    imgs JSON,
    project_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (project_id)
        REFERENCES projects (id)
  )`;
