import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/error-handler";
import { authRoutes } from "./routes/auth.routes";

export const app = fastify({
  logger: env.NODE_ENV === "development",
});

// Plugins
app.register(cors, {
  origin: true,
});

app.register(jwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: env.JWT_EXPIRES_IN,
  },
});

app.register(swagger, {
  openapi: {
    info: {
      title: "TeamFlow API",
      description:
        "Sistema de gestão de equipes por setores e projetos",
      version: "1.0.0",
    },
    tags: [
      {
        name: "Auth",
        description: "Endpoints de autenticação",
      },
      { name: "Users", description: "Gestão de usuários" },
      { name: "Sectors", description: "Gestão de setores" },
      {
        name: "Projects",
        description: "Gestão de projetos",
      },
    ],
  },
});

app.register(swaggerUi, {
  routePrefix: "/docs",
});

app.register(authRoutes, { prefix: "/auth" });

// Routes
// Vamos adicionar as rotas depois

// Error Handler
app.setErrorHandler(errorHandler);

// Health check
app.get("/health", async () => {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
  };
});
