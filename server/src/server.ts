import { fastify } from "fastify";

// Require the framework and instantiate it
const app = fastify({ logger: true });

// Declare a route
app.get("/", async (request, reply) => {
  return { hello: "world" };
});

// Run the server!
const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
