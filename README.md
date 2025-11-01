# TypeScript Backend API

Backend API desenvolvida em TypeScript com autenticação JWT, TypeORM e documentação Swagger.

## Tecnologias Utilizadas

- **TypeScript** - Linguagem de programação
- **Express** - Framework web
- **TypeORM** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Swagger** - Documentação da API
- **Docker** - Containerização

## Requisitos

- Node.js 18+
- Docker e Docker Compose
- PostgreSQL (ou use o Docker)

## Instalação

1. Clone o repositório:
\`\`\`bash
git clone <seu-repositorio>
cd typescript-backend-api
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Configure as variáveis de ambiente:
\`\`\`bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
\`\`\`

4. Execute as migrações do banco de dados:
\`\`\`bash
npm run migration:run
\`\`\`

## Executando o Projeto

### Desenvolvimento (local)
\`\`\`bash
npm run dev
\`\`\`

### Desenvolvimento (Docker)
\`\`\`bash
docker-compose up
\`\`\`

### Produção
\`\`\`bash
npm run build
npm start
\`\`\`

## Documentação da API

Após iniciar o servidor, acesse a documentação Swagger em:
\`\`\`
http://localhost:3000/api-docs
\`\`\`

## Endpoints Principais

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login de usuário

### Usuários (requer autenticação)
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Buscar usuário por ID
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

## Estrutura do Projeto

\`\`\`
src/
├── config/          # Configurações (database, swagger)
├── entities/        # Entidades TypeORM
├── controllers/     # Controladores
├── services/        # Lógica de negócio
├── middlewares/     # Middlewares (auth, error handling)
├── routes/          # Rotas da API
├── utils/           # Utilitários
└── server.ts        # Entrada da aplicação
\`\`\`

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o TypeScript
- `npm start` - Inicia o servidor em produção
- `npm run migration:generate` - Gera nova migração
- `npm run migration:run` - Executa migrações pendentes
- `npm run migration:revert` - Reverte última migração
