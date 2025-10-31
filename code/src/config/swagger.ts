import swaggerJsdoc from "swagger-jsdoc"
import { config } from "dotenv"

config()

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TypeScript Backend API",
      version: "1.0.0",
      description: "API desenvolvida em TypeScript com autenticação JWT, TypeORM e PostgreSQL",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Servidor de Desenvolvimento",
      },
      {
        url: "https://api.production.com",
        description: "Servidor de Produção",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Insira o token JWT no formato: Bearer {token}",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "ID único do usuário",
            },
            name: {
              type: "string",
              description: "Nome do usuário",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email do usuário",
            },
            isActive: {
              type: "boolean",
              description: "Status de ativação do usuário",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Data de criação",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Data de atualização",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              description: "Mensagem de erro",
            },
          },
        },
        Success: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              description: "Mensagem de sucesso",
            },
            data: {
              type: "object",
              description: "Dados retornados",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Auth",
        description: "Endpoints de autenticação",
      },
      {
        name: "Users",
        description: "Endpoints de gerenciamento de usuários",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
}

export const swaggerSpec = swaggerJsdoc(options)
