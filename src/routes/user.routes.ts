import { FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/authenticate";
import { requireRole } from "../middlewares/requireRole";
import { z } from "zod";

export async function userRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      preHandler: [authenticate, requireRole("DIRETOR")],
    },
    async (req, rep) => {
      return rep.status(201).send({
        message: "User created",
      });
    }
  );

  app.get(
    "me",
    {
      preHandler: [authenticate],
    },
    async (req, rep) => {
      return rep.send({
        user: (req as any).user,
      });
    }
  );
}
