export class UserCodeAlreadyExists extends Error {
  constructor() {
    super('Código já existente.')
  }
}
