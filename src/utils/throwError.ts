export class ThrowError {
  notFound(message: string) {
    throw { code: 'Not Found', message }
  }

  conflit(message: string) {
    throw { code: 'Conflit', message }
  }
}
