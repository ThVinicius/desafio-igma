export class Cpf {
  cpf: string

  constructor(cpf: string) {
    this.cpf = cpf
  }

  withPunctuation() {
    return this.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
}
