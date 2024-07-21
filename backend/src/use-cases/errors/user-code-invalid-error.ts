export class UserCodeInvalid extends Error {
  constructor() {
    super('O código passado é inválido.')
  }
}
