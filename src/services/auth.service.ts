import { Prisma } from "@prisma/client";
import {
  hashPassword,
  comparePassword,
} from "../utils/hash";
import { Role } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { exists } from "fs";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

type LoginInput = {
  email: string;
  password: string;
};

export class AuthService {
  async register(input: RegisterInput) {
    //Verificar se usuário já existe
    const exists = await prisma.user.findUnique({
      where: { email: input.email },
    });
    if (exists) throw new Error("User already exists");
    //Hash da senha
    const password = await hashPassword(input.password);
    //Criar usuário
    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password,
        role: input.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async login(input: LoginInput) {
    // Encontrar usuário pelo e-mail
    const user = await prisma.user.findUnique({
      // Seleciona apenas campo de e-mail e senha
      where: { email: input.email },
    });
    if (!user) throw new Error("Invalid email or password");
    const ok = await comparePassword(
      input.password,
      user.password
    );
    if (!user.isActive) throw new Error("User is inactive");
    if (!ok) throw new Error("Invalid email or password");
    // Return user or token as needed
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
