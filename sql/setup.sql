-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS monsters;

CREATE TABLE monsters (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT,
    size INT
);

INSERT INTO
    monsters (name, type, size)
VALUES
    ('Blubber', 'Goo', 2),
    ('Sir Daniel Fortesque', 'bone', 1)