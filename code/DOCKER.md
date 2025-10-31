# Guia Docker

Este guia explica como executar a aplicação usando Docker.

## Pré-requisitos

- Docker 20.10+
- Docker Compose 2.0+

## Executando com Docker Compose

### Desenvolvimento

1. Clone o repositório e navegue até a pasta:
\`\`\`bash
cd typescript-backend-api
\`\`\`

2. Inicie os containers:
\`\`\`bash
docker-compose up -d
\`\`\`

3. Verifique os logs:
\`\`\`bash
docker-compose logs -f api
\`\`\`

4. A API estará disponível em:
   - API: http://localhost:3000
   - Swagger: http://localhost:3000/api-docs
   - PostgreSQL: localhost:5432

### Comandos Úteis

**Parar os containers:**
\`\`\`bash
docker-compose down
\`\`\`

**Parar e remover volumes (limpa o banco de dados):**
\`\`\`bash
docker-compose down -v
\`\`\`

**Reconstruir as imagens:**
\`\`\`bash
docker-compose build --no-cache
docker-compose up -d
\`\`\`

**Ver logs em tempo real:**
\`\`\`bash
docker-compose logs -f
\`\`\`

**Executar comandos dentro do container:**
\`\`\`bash
docker-compose exec api sh
\`\`\`

**Executar migrações:**
\`\`\`bash
docker-compose exec api npm run migration:run
\`\`\`

## Build Manual

### Construir a imagem:
\`\`\`bash
docker build -t typescript-api:latest .
\`\`\`

### Executar o container:
\`\`\`bash
docker run -d \
  --name api \
  -p 3000:3000 \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=5432 \
  -e DB_USERNAME=postgres \
  -e DB_PASSWORD=postgres \
  -e DB_DATABASE=api_database \
  -e JWT_SECRET=your-secret-key \
  typescript-api:latest
\`\`\`

## Produção

Para produção, recomenda-se:

1. Usar variáveis de ambiente seguras
2. Configurar volumes persistentes para o banco de dados
3. Usar secrets do Docker para informações sensíveis
4. Configurar um proxy reverso (nginx)
5. Habilitar HTTPS
6. Configurar backups automáticos do banco de dados

### Exemplo com secrets:

\`\`\`bash
echo "super-secret-jwt-key" | docker secret create jwt_secret -
\`\`\`

Então no docker-compose.yml:
\`\`\`yaml
services:
  api:
    secrets:
      - jwt_secret
    environment:
      JWT_SECRET_FILE: /run/secrets/jwt_secret

secrets:
  jwt_secret:
    external: true
\`\`\`

## Troubleshooting

**Container não inicia:**
- Verifique os logs: \`docker-compose logs api\`
- Verifique se as portas estão disponíveis: \`lsof -i :3000\`

**Erro de conexão com banco de dados:**
- Verifique se o PostgreSQL está rodando: \`docker-compose ps\`
- Verifique os logs do PostgreSQL: \`docker-compose logs postgres\`
- Aguarde o health check do banco: pode levar alguns segundos

**Mudanças no código não aparecem:**
- Reconstrua a imagem: \`docker-compose build api\`
- Reinicie o container: \`docker-compose restart api\`
\`\`\`
