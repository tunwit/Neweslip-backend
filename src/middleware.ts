import { except } from "drizzle-orm/gel-core";
import Elysia, { status } from "elysia";
import { createRemoteJWKSet, jwtVerify } from "jose";

const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/oauth2/v3/certs")
);

export const middleware = async ({ request, set, jwt }) => {
  const token = request.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    console.log("Unauthorized");

    return status("Unauthorized", { error: "Authorization token missing" });
  }

  try {
    const { payload } = await jwtVerify(token!, JWKS, {
      issuer: "https://accounts.google.com",
      audience:
        "648145207628-juo34r0b5akic3mq7osh38fujvl8u35k.apps.googleusercontent.com", // your Google client ID
    });
  } catch (e) {
    console.log(e);
  }

  console.log("succsess");
};
