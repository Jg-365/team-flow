import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

//Configuração de prisma client para logar queries no console
//e evitar múltiplas conexões em ambientes serverless (Next.js)
