module.exports = function setAssociations(db) {
  db.dates.belongsToMany(db.exams, {
    through: db.examDate,
    foreignKey: 'date_id',
  })

  db.exams.belongsToMany(db.dates, {
    through: db.examDate,
    foreignKey: 'exam_id',
  })

  db.exams.hasMany(db.examDate, {
    foreignKey: 'exam_id',
  })

  db.examDate.belongsTo(db.exams, {
    foreignKey: 'exam_id',
  })

  db.examDate.belongsTo(db.dates, {
    foreignKey: 'date_id',
  })

  db.examDate.belongsToMany(db.students, {
    through: db.results,
    foreignKey: 'exam_date_id',
  })

  db.schools.belongsToMany(db.classes, {
    through: db.schoolClass,
    foreignKey: 'school_id',
  })

  db.classes.belongsToMany(db.schools, {
    through: db.schoolClass,
    foreignKey: 'class_id',
  })

  db.schoolClass.belongsTo(db.classes, {
    foreignKey: 'class_id',
  })

  db.schoolClass.belongsTo(db.schools, {
    foreignKey: 'school_id',
  })

  db.schoolClass.hasMany(db.students, {
    foreignKey: 'school_class_id',
  })

  db.students.belongsToMany(db.examDate, {
    through: db.results,
    foreignKey: 'student_id',
  })

  db.students.belongsTo(db.schoolClass, {
    foreignKey: 'school_class_id',
  })

  db.results.belongsTo(db.students, {
    foreignKey: 'student_id',
  })

  db.results.belongsTo(db.examDate, {
    foreignKey: 'exam_date_id',
  })

  db.results.hasOne(db.appeals, {
    foreignKey: 'result_id',
  })

  db.appeals.belongsTo(db.results, {
    foreignKey: 'result_id',
  })
}
