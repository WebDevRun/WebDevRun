module.exports = requisitesComparison = [
  {
    name: 'number',
    values: ['№'],
    exclude: true,
  },
  {
    name: 'local_government_code',
    values: ['код мсу'],
  },
  {
    name: 'organization_code',
    values: ['код оо'],
    allowNull: false,
  },
  {
    name: 'class',
    values: ['класс'],
    allowNull: false,
    unique: true,
  },
  {
    name: 'code_exam_point',
    values: ['код ппэ'],
    allowNull: false,
  },
  {
    name: 'auditorium_number',
    values: ['аудитория'],
    allowNull: false,
  },
  {
    name: 'last_name',
    values: ['фамилия'],
    allowNull: false,
  },
  {
    name: 'first_name',
    values: ['имя'],
    allowNull: false,
  },
  {
    name: 'patronymic',
    values: ['отчество'],
  },
  {
    name: 'passport',
    values: ['серия', 'номер', 'документ'],
    exclude: true,
  },
  {
    name: 'short_answer',
    values: ['задания с кратким ответом', 'часть с кратким ответом'],
  },
  {
    name: 'detailed_answer',
    values: ['задания с развёрнутым ответом', 'часть с развёрнутым ответом'],
  },
  { name: 'oral_answer', values: ['устная часть'] },
  {
    name: 'written_score',
    values: ['первичный балл письменной части', 'первичный балл письм. части'],
  },
  { name: 'oral_score', values: ['первичный балл устной части'] },
  { name: 'prymary_score', values: ['первичный балл'] },
  {
    name: 'estimation',
    values: ['оценка', 'тестовый балл', 'балл'],
    allowNull: false,
  },
  {
    name: 'appeal_type',
    values: ['тип апелляции / перепроверки'],
  },
  { name: 'appeal_status', values: ['состояние'] },
  { name: 'send_for_processing_date', values: ['дата отправки на обработку'] },
  { name: 'change_date', values: ['дата изменений'] },
  {
    name: 'current',
    values: ['текущие'],
    composite: ['prymary_score', 'estimation'],
  },
]
