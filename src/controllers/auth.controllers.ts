import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { AuthService } from "../services/auth.service";
import { Role } from "@prisma/client";

// Extend FastifyInstance to include 'jwt'
declare module "fastify" {
  interface FastifyInstance {
    jwt: {
      sign: (payload: any) => string;
      verify: (token: string) => any;
    };
  }
}

const authService = new AuthService();

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(Role),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export class AuthController {
  async register(req: FastifyRequest, rep: FastifyReply) {
    const body = registerSchema.parse(req.body);
    try {
      const user = await authService.register(body as any);
      return rep.status(201).send({
        message: "User registered successfully",
        user,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return rep
          .status(409)
          .send({ message: err.message });
      }
      throw err;
    }
  }
  async login(req: FastifyRequest, rep: FastifyReply) {
    const body = loginSchema.parse(req.body);
    try {
      const user = await authService.login(body as any);
      const token = req.server.jwt.sign({
        sub: user.id,
        role: user.role,
      });
      return rep.send({
        message: "login successful",
        token,
        user,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return rep
          .status(400)
          .send({ message: err.message });
      }
      throw err;
    }
  }
}
