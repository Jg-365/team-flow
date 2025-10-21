import type { Role } from "@prisma/client";

declare module "fastify" {
  interface FastifyJWT {
    payload: { sub: string; role: Role };
    user: { sub: string; role: Role };
  }

  interface FastifyRequest {
    user: { sub?: string; role: Role };
  }
}
