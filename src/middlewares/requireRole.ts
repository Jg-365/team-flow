import { FastifyReply, FastifyRequest } from "fastify";
import type { Role } from "@prisma/client";

export function requireRole(...allowedRoles: Role[]) {
  return async (req: FastifyRequest, rep: FastifyReply) => {
    const user = (req as any).user;
    const role: Role | undefined = user?.role;
    if (!role || !allowedRoles.includes(role)) {
      return rep.status(403).send({ message: "Forbidden" });
    }
  };
}
