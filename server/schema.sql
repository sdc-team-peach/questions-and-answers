CREATE SCHEMA sdc;

CREATE TABLE sdc.questions (
 id BIGSERIAL,
 product_id INTEGER,
 body TEXT,
 date_written TIMESTAMPTZ,
 asker_name VARCHAR(60),
 asker_email VARCHAR,
 reported INTEGER NOT NULL,
 helpful INTEGER NOT NULL
);


ALTER TABLE sdc.questions ADD CONSTRAINT questions_pkey PRIMARY KEY (id);

CREATE TABLE sdc.answers  (
 id BIGSERIAL,
 question_id INTEGER NOT NULL,
 body TEXT,
 date_written TIMESTAMPTZ,
 answerer_name VARCHAR(60),
 answerer_email VARCHAR,
 reported INTEGER,
 helpful INTEGER NOT NULL
);


ALTER TABLE sdc.answers  ADD CONSTRAINT answers_pkey PRIMARY KEY (id);

CREATE TABLE sdc.answers_photos (
 id BIGSERIAL,
 answer_id INTEGER NOT NULL,
 url TEXT NOT NULL
);


ALTER TABLE sdc.answers_photos ADD CONSTRAINT answers_photos_pkey PRIMARY KEY (id);

ALTER TABLE sdc.answers  ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES sdc.questions(id);
ALTER TABLE sdc.answers_photos ADD CONSTRAINT answers_photos_answer_id_fkey FOREIGN KEY (answer_id) REFERENCES sdc.answers (id);

-- CREATE SCHEMA
-- \i /Users/bulganerdenebaatar/Desktop/hackreactor2201/questions-and-answers/server/schema.sql

-- IMPORT CSV DATA
-- COPY sdc.answers_photos FROM '/Users/bulganerdenebaatar/Downloads/answers_photos.csv' delimiter ',' CSV HEADER ;

-- COPY sdc.questions FROM '/Users/bulganerdenebaatar/Desktop/hackreactor2201/questions-and-answers/server/csv-files/questions.csv' delimiter ',' CSV HEADER ;

-- select * from sdc.questions limit 10; // test it

-- COPY sdc.answers FROM '/Users/bulganerdenebaatar/Desktop/hackreactor2201/questions-and-answers/server/answers.csv' delimiter ',' CSV HEADER ;


-- brew services start postgresql