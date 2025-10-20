import { app } from "./app";
import { env } from "./config/env";

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log(
      `🚀 Server running on http://localhost:${env.PORT}`
    );
    console.log(
      `📚 Documentation on http://localhost:${env.PORT}/docs`
    );
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
