export interface JWTPayload {
  name: string;
  email: string;
  picture: string;
  sub: string;
  userId: number;
  exp: number;
}
