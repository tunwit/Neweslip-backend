import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import user from "./routes/user";

const app = new Elysia({
  prefix: "/v1",
})
  .use(swagger())
  .use(user)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${process.env.ELYSIA_PORT}`
);
