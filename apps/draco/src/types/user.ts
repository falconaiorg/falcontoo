export type JWTUser = {
  name: string;
  email: string;
  picture: string;
  sub: string;
  id: string;
  plan: string;
  planStart: string;
  planEnd: string;
  iat: number;
  exp: number;
  jti: string;
};
