# Desafio IGMA

<div align="center">

<h3>Construído com</h3>

  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" height="30px"/>

  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Sumário

- [Descrição](#description)
- [Deploy](#deploy)
- [Modelagem do banco de dados](#database)
- [Links uteis para testar a aplicação](#utils)
- [Documentação da API](#api-reference)
  - [Rota dos clientes](#customers-routes)
    - [Cadastrar um cliente](#post-customers)
    - [Buscar todos os clientes](#get-customers)
    - [Buscar o cliente pelo seu CPF](#get-customers-by-cpf)
- [Rodar localmente](#run-local)
- [Rodar com docker](#run-docker)
- [Rodar os testes](#run-tests)

<div id='description'/>

# Descrição

Desafio técnico do processo seletivo da IGMA.

</br>

## Funções

- Cadastrar um cliente
- Buscar todos os clientes
- Buscar o cliente pelo seu CPF

</br>

<div id='deploy'/>

# Deploy

- [Link Deploy](https://desafio-igma.onrender.com)

<div id='database'/>

# Modelagem do banco de dados

<img src="./readMeAssets/images/desafio_igma - public.png"/>

- Tipos de dados

  - name: string
  - cpf: string
  - dateOfBirth: string

- Constraints
  - name: not null
  - cpf: not null, unique, maxLength(14)
  - dateOfBirth: maxLength(10)

#

<div id='utils'/>

# Links uteis para testar a aplicação

- [Gerador de CPF](https://www.4devs.com.br/gerador_de_cpf)

#

<div id='api-reference'/>

# Documentação da API

<div id='customers-routes'/>

## Rotas dos clientes

<div id='post-customers'/>

### Cadastrar um cliente

```http
POST /api/customers
```

<h3>Mandar pelo body da requisição:</h3>

| Parâmetro     | Tipo     | Descrição                                                                                       |
| :------------ | :------- | :---------------------------------------------------------------------------------------------- |
| `name`        | `string` | **Obrigatório**, **não vazio**                                                                  |
| `cpf`         | `string` | **Obrigatório**, **não vazio**, **em um dos seguintes formatos: 999.999.999-99 ou 99999999999** |
| `dateOfBirth` | `string` | **Obrigatório**, **no seguinte formato: DD/MM/YYYY**                                            |

<h2>Respostas:</h2>

<h3>Em caso de erro:</h3>

| Status code | Causa                                          |
| :---------- | :--------------------------------------------- |
| `400`       | _Requisição no formato incorreto_              |
| `409`       | _Conflito entre cpf (cada cpf deve ser único)_ |
| `422`       | _CPF inválido_                                 |

<h3>Em caso de sucesso:</h3>

- Status code: 201
- um objeto json referente ao cadastro do cliente

```json
{
  "id": 1,
  "name": "José",
  "cpf": "359.222.290-28",
  "dateOfBirth": "04/04/2000"
}
```

#

<div id='get-customers'/>

### Buscar todos os clientes

```http
GET /api/customers
```

<h3>Mandar pela query da requisição:</h3>

| Parâmetro | Tipo     | Descrição                        |
| :-------- | :------- | :------------------------------- |
| `page`    | `number` | **Obrigatório**, **maior que 0** |
| `take`    | `number` | **Obrigatório**, **maior que 0** |

Obs: por default page é igual a 1 e take é igual a 10. Esses valores serão utilizados caso não passe uma ou as duas querys.

<h2>Resposta:</h2>

<h3>Em caso de sucesso:</h3>

- Status code: 200
- Um array de clientes

```json
[
  {
  "id": 1,
  "name": "José",
  "cpf": "359.222.290-28",
  "dateOfBirth": "04/04/2000"
  },
  {
  "id": 2,
  "name": "Maria",
  "cpf": "349.925.620-78",
  "dateOfBirth": "04/04/2001"
  }
  .
  .
  .
]
```

#

<div id='get-customers-by-cpf'/>

### Buscar o cliente pelo seu CPF

```http
GET /api/customers/:cpf
```

<h3>Mandar pelo params da requisição:</h3>

| Parâmetro | Tipo     | Descrição                                                                                       |
| :-------- | :------- | :---------------------------------------------------------------------------------------------- |
| `cpf`     | `string` | **Obrigatório**, **não vazio**, **em um dos seguintes formatos: 999.999.999-99 ou 99999999999** |

Exemplo: http://localhost:4000/api/customers/359.222.290-28

<h2>Respostas:</h2>

<h3>Em caso de erro:</h3>

| Status code | Causa                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `404`       | _cliente não encontrado_          |

<h3>Em caso de sucesso:</h3>

- Status code: 200
- Um objeto contendo o cliente

```json
{
  "id": 1,
  "name": "José",
  "cpf": "359.222.290-28",
  "dateOfBirth": "04/04/2000"
}
```

#

<div id='run-local'/>

# Rodar localmente

Clone o projeto

```bash
  git clone https://github.com/ThVinicius/desafio-igma.git
```

Vá para o diretório do projeto

```bash
  cd desafio-igma
```

Instale as dependências

```bash
npm i
```

Modifique o arquivo `.env` no diretório raiz do projeto com suas credências do postgreSQL:

- `DATABASE_URL=postgres://{user}:{password}@localhost:5432/desafio_igma`

Crie a tabela no banco de dados

```bash
npm run migrate dev
```

Inice o projeto

```bash
npm run dev
```

A aplicação ficará disponivel na porta 4000 (http://localhost:4000)

<div id='run-docker'/>

# Rodar com docker

Vá para o diretório do projeto

```bash
  cd desafio-igma
```

Faça o build do container

```bash
  docker-compose up --build -d
```

A aplicação ficará disponivel na porta 4000 (http://localhost:4000)

Caso queira parar o container basta utilizar o comando

```bash
  docker-compose down
```

<div id='run-tests'/>

# Rodar os testes

## Localmente

Instale as dependências

```bash
npm i
```

Modifique o arquivo `.env.test` no diretório raiz do projeto com suas credências do postgreSQL:

- `DATABASE_URL=postgres://{user}:{password}@localhost:5432/desafio_igma_test`

Rode os testes com o comando:

```bash
npm run test
```

## Com o docker

Inicie o docker-compose

```bash
docker-compose -f docker-compose-dev.yml up --build -d
```

A aplicação ficará disponivel na porta 4000 (http://localhost:4000)

Execute o comando

```bash
docker exec node_desafio_igma_test npm run test
```

Caso queira parar o container basta utilizar o comando

```bash
  docker-compose -f docker-compose-dev.yml down
```

</br>

## Acknowledgements

- [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

</br>
