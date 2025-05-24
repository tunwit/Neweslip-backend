import { JWTPayloadSpec } from "@elysiajs/jwt";
import { Context } from "elysia/dist/context";
import { JWTPayload } from "./JWTPayload";

export interface CustomContext extends Context {
  user: JWTPayload;
  jwt: {
    sign(
      morePayload: Record<string, string | number> & JWTPayloadSpec
    ): Promise<string>;
    verify(
      jwt?: string
    ): Promise<false | (Record<string, string | number> & JWTPayloadSpec)>;
  };
}
