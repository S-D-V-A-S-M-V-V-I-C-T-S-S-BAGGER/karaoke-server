import { fastify } from "fastify";
import cors from "@fastify/cors";
import { SongQueue } from "./SongQueue";
import * as yt from "youtube-search-without-api-key";

// Require the framework and instantiate it
const app = fastify({ logger: true });

app.register(cors, {
  origin: (origin, cb) => {
    cb(null, true);
  },
});

// Declare a route
app.get("/", async (request, reply) => {
  return { hello: "world" };
});

app.get("/search/:query", async (request, reply) => {
  // @ts-ignore
  const query = request.params.query;
  const result = await yt.search(query);

  return result;
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

if (process.argv[2]) {
  (async () => {
    console.log("Creating queue");
    const queue = new SongQueue();
    await queue.addAdmission({
      singerName: "Ives",
      song: {
        artist: "k",
        name: "Test Song",
        youtubeId: "0k2dGhF6yVk",
      },
    });
  })();
}
