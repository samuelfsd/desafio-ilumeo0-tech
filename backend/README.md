### backend

Backend feito em node com Fastify utilizando SOLID

### como rodar o projeto 

...

### techs usadas

- Typescript
- Node
- Fastify
- Prisma
- Docker
- PostgresSQL
- Eslint + Prettier
- zod
- dotenv

### @TODO

- [x] Deve ser possível se cadastrar.
- [x] Deve ser possível se autenticar por meio do código.
- [x] Deve ser possível obter o perfil de um usuário logado.
- [x] Deve ser possível marcar um ponto
- [x] Deve ser possível marcar o ponto de entrada caso não tenha sido informado anteriormente.
- [x] Deve ser possível marcar o ponto de saída caso não tenha sido informado anteriormente.
- [] Deve ser possível visualizar a listagem de dias anteriores trabalhados com seus horários trabalhados.

### anotações

Sim, é uma boa estratégia!

Se você estiver criando um novo ponto de saída com base em um ponto de entrada, é uma boa ideia pegar as horas atuais do ponto de entrada e então decrementar as horas do ponto de saída com base nas horas do ponto de entrada.

Isso ajudará a garantir que as horas do ponto de saída sejam consistentes com as horas do ponto de entrada, o que é importante para muitos casos de uso.

No entanto, é importante lembrar que você também precisa considerar a hora de criação do ponto de saída, pois isso pode afetar a hora final do ponto de saída.

Por exemplo, se o ponto de entrada for criado às 14:00 e o ponto de saída for criado às 16:00, você pode querer decrementar as horas do ponto de saída com base nas horas do ponto de entrada, mas também considerar a hora de criação do ponto de saída.

Nesse caso, você pode usar a hora de criação do ponto de saída para calcular a hora final do ponto de saída, e então decrementar as horas do ponto de saída com base nas horas do ponto de entrada.

Lembre-se de que a hora de criação do ponto de saída é importante para muitos casos de uso, pois pode afetar a hora final do ponto de saída.