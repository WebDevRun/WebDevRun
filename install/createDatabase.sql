BEGIN;

CREATE TABLE students (
  id TEXT PRIMARY KEY,
  last_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  patronymic TEXT,
  class_id TEXT NOT NULL,
  school_id TEXT NOT NULL,
  
  FOREIGN KEY(class_id) REFERENCES classes(id),
  FOREIGN KEY(school_id) REFERENCES schools(id)
) WITHOUT ROWID;

CREATE TABLE classes (
  id PRIMARY KEY,
  class_name TEXT NOT NULL
) WITHOUT ROWID;

CREATE TABLE schools (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  short_name TEXT NOT NULL,
  full_name TEXT NOT NULL
) WITHOUT ROWID;

CREATE TABLE exams (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  exam_date_id TEXT NOT NULL,

  FOREIGN KEY(exam_date_id) REFERENCES exam_dates(id)
) WITHOUT ROWID;

CREATE TABLE exam_dates (
  id PRIMARY KEY,
  date TEXT NOT NULL,
  exam_term_id TEXT NOT NULL,
  exam_stage_id TEXT NOT NULL,

  FOREIGN KEY(exam_term_id) REFERENCES exam_terms(id),
  FOREIGN KEY(exam_stage_id) REFERENCES exam_stages(id)
) WITHOUT ROWID;

CREATE TABLE exam_terms (
  id PRIMARY KEY,
  term_name TEXT NOT NULL
) WITHOUT ROWID;

CREATE TABLE exam_stages (
  id PRIMARY KEY,
  stage_name TEXT NOT NULL
) WITHOUT ROWID;

CREATE TABLE IF NOT EXISTS results (
  id PRIMARY KEY,
  exam_id TEXT NOT NULL,
  student_id TEXT NOT NULL,
  code_exam_point TEXT NOT NULL,
  auditorium_number TEXT NOT NULL,
  short_answer TEXT,
  detailed_answer TEXT,
  oral_answer TEXT,
  oral_score TEXT,
  written_score TEXT,
  primary_score TEXT,
  test_score TEXT NOT NULL,

  FOREIGN KEY(exam_id) REFERENCES exams(id),
  FOREIGN KEY(student_id) REFERENCES students(id)
) WITHOUT ROWID;

INSERT INTO schools (id, code, short_name, full_name)
VALUES
('4e63512f-b83d-4ac1-9912-b7c772ddd935', '111001', 'МБОУ "Таштыпская школа-интернат №1"', 'Муниципальное бюджетное общеобразовательное учреждение "Таштыпская средняя общеобразовательная школа-интернат № 1 имени Л.А. Третьяковой"'),
('6561cb0b-da08-4cd7-9570-b1961f2aaa66', '111002', 'МБОУ "ТСШ №2"', 'Муниципальное бюджетное общеобразовательное учреждение "Таштыпская общеобразовательная средняя школа №2"'),
('98318491-962a-43f4-8a7a-d492f2aa5381', '111003', 'МБОУ "Имекская СОШ"', 'Муниципальное бюджетное общеобразовательное учреждение "Имекская средняя общеобразовательная школа"'),
('2b3b1802-4de4-480b-9c88-ee0072b8103d', '111004', 'МБОУ "Бутрахтинская СОШ им. В.Г. Карпова"', 'Муниципальное бюджетное общеобразовательное учреждение "Бутрахтинская средняя общеобразовательная школа им. В.Г. Карпова"'),
('a4454312-88d0-417b-b66e-50b5b171a7ff', '111005', 'МБОУ "В-Таштыпская СОШ"', 'Муниципальное бюджетное общеобразовательное учреждение "Верх-Таштыпская средняя общеобразовательная школа"'),
('20064653-04df-43b5-ad16-75763d900113', '111006', 'МБОУ "Матурская СОШ"', 'Муниципальное бюджетное общеобразовательное учреждение "Матурская средняя общеобразовательная школа" имени Героя Советского Союза Григория Трофимовича Зорина'),
('7d1cf963-9edd-448d-a0b2-1899a05ff094', '111007', 'МБОУ "Малоарбатская СОШ"', 'Муниципальное бюджетное общеобразовательное учреждение "Малоарбатская средняя общеобразовательная школа"'),
('4e281143-f835-441e-8d96-6bcf9946dc01', '111008', 'МБОУ Арбатская СОШ', 'Муниципальное бюджетное общеобразовательное учреждение "Арбатская средняя общеобразовательная школа"'),
('96c99531-2f32-408c-8644-6b2bda3a5937', '111009', 'МБОУ "Большесейская СОШ"', 'Муниципальное бюджетное общеобразовательное учреждение "Большесейская средняя общеобразовательная школа"'),
('f199e818-a0a7-4512-9093-ef7b915e1f18', '111010', 'МБОУ "Нижнесиркая ООШ"', 'Муниципальное бюджетное образовательное учреждение Нижнесирская основная общеобразовательная школа');

INSERT INTO classes (id, class_name)
VALUES
('c58ff60c-61cb-4e29-9147-1c9dd3736d72', '11'),
('ef07995e-41c1-41a4-a496-d40d5d04576d', '11А'),
('a3ee63b4-7270-41d5-a1cb-ac8c21fcb4dd', '11Б'),
('10233ad0-d560-456c-932e-52ceb9748e5f', '11В');

INSERT INTO exam_stages (id, stage_name)
VALUES
('81335de1-4b8a-48bb-87ab-9ce52de6516e', 'досрочный этап'),
('7073ebb2-ff04-43d0-9dc9-4d53d3317fb6', 'основной этап'),
('6848f3de-f41a-4cca-9707-cc331239f7f2', 'дополнительный этап');

INSERT INTO exam_terms (id, term_name)
VALUES
('ade6a2cd-98a5-41e3-a5cd-fc1c1aea3f2e', 'основной срок'),
('53259f4a-8919-4609-aeb4-18ba01b9d906', 'дополнительный срок');

COMMIT;