import {
  FastifyError,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { ZodError } from "zod";

export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      errors: error.format(),
    });
  }

  if (error.statusCode === 401) {
    return reply.status(401).send({
      message: error.message || "Unauthorized",
    });
  }

  if (error.statusCode === 403) {
    return reply.status(403).send({
      message: error.message || "Forbidden",
    });
  }

  if (error.statusCode === 404) {
    return reply.status(404).send({
      message: error.message || "Not found",
    });
  }

  console.error(error);

  return reply.status(500).send({
    message: "Internal server error",
  });
}
