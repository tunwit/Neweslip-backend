import { JWTPayload } from "../types/JWTPayload";

export const isJWTPayload = (obj: any): obj is JWTPayload => {
  return (
    obj &&
    typeof obj.name === "string" &&
    typeof obj.email === "string" &&
    typeof obj.picture === "string" &&
    typeof obj.sub === "string" &&
    typeof obj.userId === "number" &&
    typeof obj.exp === "number"
  );
};
