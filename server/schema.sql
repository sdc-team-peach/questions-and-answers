DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;

DROP SCHEMA IF EXISTS sdc;
CREATE SCHEMA sdc;

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
COPY sdc.questions FROM 'server/csv-files/questions.csv' delimiter ',' CSV HEADER ;

COPY sdc.answers FROM 'server/csv-files/answers.csv' delimiter ',' CSV HEADER ;

COPY sdc.answers_photos FROM 'server/csv-files/answers_photos.csv' delimiter ',' CSV HEADER ;


-- `
--  SELECT json_agg(results) as results from (
--    SELECT id as question_id, body as question_body, date_written as question_date, asker_name, helpful as question_helpfulness, reported  FROM sdc.questions WHERE sdc.questions.product_id = ${productId}
--  ) as results
--  `


-- SELECT sdc.questions.id AS question_id,
-- sdc.questions.body AS question_body,
-- sdc.questions.date_written AS question_date,
-- sdc.questions.asker_name,
-- sdc.questions.helpful AS question_helpfulness,
-- sdc.questions.reported AS question_reported,
-- sdc.answers.id AS answers_id,
-- sdc.answers.body AS answers_body,
-- sdc.answers.date_written AS answers_date,
-- sdc.answers.answerer_name,
-- sdc.answers.helpful AS answers_helpfulness,
-- sdc.answers_photos.url
-- FROM sdc.questions
-- JOIN sdc.answers
-- ON sdc.questions.id = sdc.answers.question_id
-- JOIN sdc.answers_photos
-- ON sdc.answers.id = sdc.answers_photos.answer_id
-- WHERE sdc.questions.product_id = 5
-- GROUP BY sdc.questions.id, sdc.answers.id;



-- TO CREATE SCHEMA
-- \i /Users/bulganerdenebaatar/Desktop/hackreactor2201/questions-and-answers/server/schema.sql

-- TO START PSQL
-- brew services start postgresql
-- psql sdc -U bulganerdenebaatar -f server/schema.sql
-- \c sdc;

--select setval('sdc.answers_id_seq', (select max(id) from sdc.answers)+1);


-- SELECT
--     tablename,
--     indexname,
--     indexdef
-- FROM
--     pg_indexes
-- WHERE
--     schemaname = 'sdc'
-- ORDER BY
--     tablename,
--     indexname;


-- SELECT q.id question_id, q.body question_body, q.date_written question_Date, q.asker_name, q.helpful question_helpfulness, q.reported,(select json_object_agg(a.id, row_to_json(a)) from (SELECT id, body, date_written as date, answerer_name, helpful as helpfulness, (select json_agg(p.url) from sdc.photos as p where p.answer_id = sdc.answers.id) sdc.photos from sdc.answers where question_id = $1 a) sdc.answers from sdc.questions as q where product_id=$1
