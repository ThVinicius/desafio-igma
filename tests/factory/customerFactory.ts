export class Customer {
  name: string
  cpf: string
  dateOfBirth: string

  constructor() {
    this.name = 'José'
    this.cpf = '376.313.310-06'
    this.dateOfBirth = '04/04/2000'
  }

  get() {
    return {
      name: this.name,
      cpf: this.cpf,
      dateOfBirth: this.dateOfBirth
    }
  }

  withId() {
    return {
      id: 1,
      name: this.name,
      cpf: this.cpf,
      dateOfBirth: this.dateOfBirth
    }
  }

  withInvalidCpf() {
    return {
      name: this.name,
      cpf: '111.444.777-05',
      dateOfBirth: this.dateOfBirth
    }
  }

  tenCustomers() {
    const cpfs = [
      '545.574.740-12',
      '268.861.840-75',
      '822.033.130-56',
      '498.544.270-48',
      '912.656.080-16',
      '720.792.400-30',
      '563.544.610-82',
      '030.770.800-44',
      '046.659.970-63',
      '860.612.090-10'
    ]

    return cpfs.map(cpf => ({
      name: this.name,
      cpf,
      dateOfBirth: this.dateOfBirth
    }))
  }

  tenCustomersWithId() {
    return this.tenCustomers().map((customer, index) => ({
      id: index + 1,
      ...customer
    }))
  }
}
