import { FastifyReply, FastifyRequest } from "fastify";

export async function authenticate(
  req: FastifyRequest,
  rep: FastifyReply
) {
  try {
    await (req as any).jwtVerify();
  } catch (err) {
    return rep
      .status(401)
      .send({ message: "Unauthorized" });
  }
}
