# API de Rifas

Esta é a API para gerenciamento de rifas. Ela permite que os usuários criem, atualizem, deletem rifas, comprem bilhetes e realizem sorteios.

## Tecnologias Utilizadas

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL
- Swagger para Documentação da API

## Configuração do Projeto

### Pré-requisitos

- Node.js instalado
- MySQL instalado e rodando

### Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/nossa-sorte.git
    cd nossa-sorte
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente:
    Crie um arquivo `.env` com as seguintes variáveis:
    ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=sua_senha
    DB_NAME=nossa_sorte
    JWT_SECRET=seu_segredo
    ```

4. Sincronize os modelos com o banco de dados:
    ```bash
    npm run dev
    ```

5. Inicie o servidor:
    ```bash
    npm run dev
    ```

### Documentação da API

A documentação da API pode ser acessada em: http://localhost:3000/api-docs/


### Rotas da API

#### Autenticação

- `POST /auth/register`: Registra um novo usuário
- `POST /auth/login`: Realiza o login de um usuário

#### Rifas

- `POST /raffle/create`: Cria uma nova rifa (Requer autenticação)
- `PUT /raffle/:id`: Atualiza uma rifa existente (Requer autenticação)
- `DELETE /raffle/:id`: Deleta uma rifa existente (Requer autenticação)
- `GET /raffle/:id`: Busca uma rifa pelo ID
- `GET /raffle/all`: Lista todas as rifas disponíveis

#### Compras

- `POST /purchase`: Compra bilhetes para uma rifa (Requer autenticação)

#### Sorteios

- `POST /draw/:id`: Realiza o sorteio de uma rifa (Requer autenticação)

