CREATE TABLE questions (
 id BIGSERIAL,
 product_id INTEGER,
 body TEXT,
 date_written DATE,
 asker_name VARCHAR(60),
 asker_email VARCHAR,
 reported INTEGER NOT NULL,
 helpful INTEGER NOT NULL
);


ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (id);

CREATE TABLE answers  (
 id BIGSERIAL,
 question_id INTEGER NOT NULL,
 body TEXT,
 date_written DATE,
 answerer_name VARCHAR(60),
 answerer_email VARCHAR,
 reported INTEGER,
 helpful INTEGER NOT NULL
);


ALTER TABLE answers  ADD CONSTRAINT answers_pkey PRIMARY KEY (id);

CREATE TABLE answers_photos (
 id BIGSERIAL,
 answer_id INTEGER NOT NULL,
 url TEXT NOT NULL
);


ALTER TABLE answers_photos ADD CONSTRAINT answers_photos_pkey PRIMARY KEY (id);

ALTER TABLE answers  ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id);
ALTER TABLE answers_photos ADD CONSTRAINT answers_photos_answer_id_fkey FOREIGN KEY (answer_id) REFERENCES answers (id);