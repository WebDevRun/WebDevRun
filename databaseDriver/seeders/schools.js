const { randomUUID } = require('crypto')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('schools', [
      {
        id: randomUUID(),
        code: '111001',
        short_name: 'МБОУ "Таштыпская школа-интернат №1"',
        full_name:
          'Муниципальное бюджетное общеобразовательное учреждение "Таштыпская средняя общеобразовательная школа-интернат № 1 имени Л.А. Третьяковой"',
      },
      {
        id: randomUUID(),
        code: '111002',
        short_name: 'МБОУ "ТСШ №2"',
        full_name:
          'Муниципальное бюджетное общеобразовательное учреждение "Таштыпская общеобразовательная средняя школа №2"',
      },
      {
        id: randomUUID(),
        code: '111003',
        short_name: 'МБОУ "Имекская СОШ"',
        full_name:
          'Муниципальное бюджетное общеобразовательное учреждение "Имекская средняя общеобразовательная школа"',
      },
      {
        id: randomUUID(),
        code: '111004',
        short_name: 'МБОУ "Бутрахтинская СОШ им. В.Г. Карпова"',
        full_name:
          'Муниципальное бюджетное общеобразовательное учреждение "Бутрахтинская средняя общеобразовательная школа им. В.Г. Карпова"',
      },
      {
        id: randomUUID(),
        code: '111005',
        short_name: 'МБОУ "В-Таштыпская СОШ"',
        full_name:
          'Муниципальное бюджетное общеобразовательное учреждение "Верх-Таштыпская средняя общеобразовательная школа"',
      },
      {
        id: randomUUID(),
        code: '111006',
        short_name: 'МБОУ "Матурская СОШ"',
        full_name:
          'Муниципальное бюджетное общеобразовательное учреждение "Матурская средняя общеобразовательная школа" имени Героя Советского Союза Григория Трофимовича Зорина',
      },
      {
        id: randomUUID(),
        code: '111007',
        short_name: 'МБОУ "Малоарбатская СОШ"',
        full_name:
          'Муниципальное бюджетное общеобразовательное учреждение "Малоарбатская средняя общеобразовательная школа"',
      },
      {
        id: randomUUID(),
        code: '111008',
        short_name: 'МБОУ Арбатская СОШ',
        full_name:
          'Муниципальное бюджетное общеобразовательное учреждение "Арбатская средняя общеобразовательная школа"',
      },
      {
        id: randomUUID(),
        code: '111009',
        short_name: 'МБОУ "Большесейская СОШ"',
        full_name:
          'Муниципальное бюджетное общеобразовательное учреждение "Большесейская средняя общеобразовательная школа"',
      },
      {
        id: randomUUID(),
        code: '111010',
        short_name: 'МБОУ "Нижнесиркая ООШ"',
        full_name:
          'Муниципальное бюджетное образовательное учреждение Нижнесирская основная общеобразовательная школа',
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('schools', null, {})
  },
}
