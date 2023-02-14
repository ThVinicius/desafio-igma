import { Request, Response, NextFunction } from 'express'
import { Cpf } from '../utils/cpf'

export class CpfValidator {
  use(req: Request, res: Response, next: NextFunction) {
    const cpf: string = req.body.cpf

    const cpfWithoutPunctuation = cpf.replaceAll('.', '').replace('-', '')

    const cpfSlit = cpfWithoutPunctuation.split('').map(Number)

    const secondDigitOfCpf = cpfSlit[10]
    const firstTenCpfNumbers = cpfSlit.slice(0, 10)

    const firstDigitOfCpf = cpfSlit[9]
    const firstNineCpfNumbers = cpfSlit.slice(0, 9)

    const firstDigitValidation: boolean = CpfValidator.digitValidation(
      firstNineCpfNumbers,
      firstDigitOfCpf
    )
    if (firstDigitValidation) return res.status(422).send('CPF inválido')

    const secondDigitValidation: boolean = CpfValidator.digitValidation(
      firstTenCpfNumbers,
      secondDigitOfCpf
    )

    if (secondDigitValidation) return res.status(422).send('CPF inválido')

    const cpfWithPunctuation = new Cpf(cpfWithoutPunctuation).withPunctuation()

    req.body.cpf = cpfWithPunctuation

    next()
  }

  private static digitValidation(cpf: number[], digit: number) {
    const initialMultiplier = cpf.length + 1

    const cPFNumbersMultipliedAndAdded = CpfValidator.multiplyAndAddTheArray(
      cpf,
      initialMultiplier
    )

    const restOf11 = cPFNumbersMultipliedAndAdded % 11

    return this.splitValidation(restOf11, digit)
  }

  private static splitValidation(rest: number, digit: number) {
    const firstValidation = rest < 2 && digit !== 0
    const secondValidation = rest >= 2 && 11 - rest !== digit

    return firstValidation || secondValidation
  }

  private static multiplyAndAddTheArray(
    cpf: number[],
    initialMultiplier: number
  ) {
    return cpf.reduce((acc, curr) => {
      const aux = curr * initialMultiplier + acc
      initialMultiplier--
      return aux
    }, 0)
  }
}
