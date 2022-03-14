DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;
\c sdc;
-- DROP SCHEMA IF EXISTS sdc;
-- CREATE SCHEMA sdc;

DROP TABLE IF EXISTS sdc.questions, sdc.answers, sdc.answers_photos CASCADE;
DROP TABLE IF EXISTS questions, answers, answers_photos CASCADE;

CREATE TABLE questions (
 id BIGSERIAL,
 product_id INTEGER,
 body TEXT,
 date_written TIMESTAMPTZ,
 asker_name VARCHAR(60),
 asker_email VARCHAR,
 reported BOOLEAN,
 helpful INTEGER
);
ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (id);

CREATE TABLE answers  (
 id BIGSERIAL,
 question_id INTEGER NOT NULL,
 body TEXT,
 date_written TIMESTAMPTZ,
 answerer_name VARCHAR(60),
 answerer_email VARCHAR,
 reported BOOLEAN,
 helpful INTEGER
);
ALTER TABLE answers  ADD CONSTRAINT answers_pkey PRIMARY KEY (id);

CREATE TABLE answers_photos (
 id BIGSERIAL,
 answer_id INTEGER NOT NULL,
 url TEXT NOT NULL
);
ALTER TABLE answers_photos ADD CONSTRAINT answers_photos_pkey PRIMARY KEY (id);

--CREATE FOREIGN KEYS
ALTER TABLE answers  ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id);
ALTER TABLE answers_photos ADD CONSTRAINT answers_photos_answer_id_fkey FOREIGN KEY (answer_id) REFERENCES answers (id);

-- -- CREATE INDEX
CREATE INDEX idx_questions_product_id ON questions (product_id);
CREATE INDEX idx_question_id ON answers (question_id);
CREATE INDEX idx_ans_photo_id ON answers_photos(answer_id);

-- IMPORT CSV DATA
\COPY questions FROM 'server/csv-files/questions.csv' delimiter ',' CSV HEADER ;

\COPY answers FROM 'server/csv-files/answers.csv' delimiter ',' CSV HEADER ;

\COPY answers_photos FROM 'server/csv-files/answers_photos.csv' delimiter ',' CSV HEADER ;