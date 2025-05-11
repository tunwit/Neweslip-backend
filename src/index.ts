import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import user from "./routes/protected/user";
import jwt from "@elysiajs/jwt";
import protected_route from "./routes/protected/protected";
import public_route from "./routes/public/public";
import cors from "@elysiajs/cors";

const app = new Elysia({
  prefix: "/v1",
})
  .use(cors({ origin: true }))
  .use(
    jwt({
      name: "jwt",
      secret: process.env.ELYSIA_JWT_SECRET!,
    })
  )
  .use(swagger())
  .use(protected_route)
  .use(public_route)
  .get("/", () => "Hello Elysia")
  .listen(process.env.ELYSIA_PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${process.env.ELYSIA_PORT}`
);
