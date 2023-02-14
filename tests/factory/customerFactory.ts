export class Customer {
  factory() {
    return {
      name: 'José',
      cpf: '37631331006',
      dateOfBirth: '04/04/2000'
    }
  }

  factoryWithId() {
    return {
      id: 1,
      name: 'José',
      cpf: '37631331006',
      dateOfBirth: '04/04/2000'
    }
  }
}
