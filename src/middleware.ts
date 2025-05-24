import { except } from "drizzle-orm/gel-core";
import Elysia, { Cookie, status } from "elysia";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { JWT } from "next-auth/jwt";
import { JWTPayload } from "../types/JWTPayload";

interface middlewareProps {
  user: JWTPayload | undefined;
  session_token: string | undefined;
  request: Request;
  jwt: any;
  cookie: Record<string, Cookie<string | undefined>>;
}

export const middleware = async ({
  user,
  session_token,
  request,
  jwt,
  cookie,
}: middlewareProps) => {
  const log = (message: string) => {
    console.log(
      `[${new Date().toISOString()}] ${request.method} ${
        request.url
      } ${message}`
    );
  };

  log("🔄 Request received at middleware");
  if (!session_token || !user) {
    log("⛔ Unauthorized: Missing session token");
    return status("Unauthorized", {
      error: "Authorization token missing or expried",
    });
  }

  log("✅ Authentication successful");
  return;
};
