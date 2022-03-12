DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;

-- DROP SCHEMA IF EXISTS sdc;
-- CREATE SCHEMA sdc;

DROP TABLE IF EXISTS sdc.questions, sdc.answers, sdc.answers_photos;

CREATE TABLE sdc.questions (
 id BIGSERIAL,
 product_id INTEGER,
 body TEXT,
 date_written TIMESTAMPTZ,
 asker_name VARCHAR(60),
 asker_email VARCHAR,
 reported BOOLEAN,
 helpful INTEGER
);
ALTER TABLE sdc.questions ADD CONSTRAINT questions_pkey PRIMARY KEY (id);

CREATE TABLE sdc.answers  (
 id BIGSERIAL,
 question_id INTEGER NOT NULL,
 body TEXT,
 date_written TIMESTAMPTZ,
 answerer_name VARCHAR(60),
 answerer_email VARCHAR,
 reported BOOLEAN,
 helpful INTEGER
);
ALTER TABLE sdc.answers  ADD CONSTRAINT answers_pkey PRIMARY KEY (id);

CREATE TABLE sdc.answers_photos (
 id BIGSERIAL,
 answer_id INTEGER NOT NULL,
 url TEXT NOT NULL
);
ALTER TABLE sdc.answers_photos ADD CONSTRAINT answers_photos_pkey PRIMARY KEY (id);

--CREATE FOREIGN KEYS
ALTER TABLE sdc.answers  ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES sdc.questions(id);
ALTER TABLE sdc.answers_photos ADD CONSTRAINT answers_photos_answer_id_fkey FOREIGN KEY (answer_id) REFERENCES sdc.answers (id);

-- CREATE INDEX
CREATE INDEX idx_questions_product_id ON sdc.questions USING btree (product_id);
CREATE INDEX idx_question_id ON sdc.answers USING btree (question_id);
CREATE INDEX idx_ans_photo_id ON sdc.answers_photos(id, answer_id);

-- IMPORT CSV DATA
\COPY sdc.questions FROM 'server/csv-files/questions.csv' delimiter ',' CSV HEADER ;

\COPY sdc.answers FROM 'server/csv-files/answers.csv' delimiter ',' CSV HEADER ;

\COPY sdc.answers_photos FROM 'server/csv-files/answers_photos.csv' delimiter ',' CSV HEADER ;