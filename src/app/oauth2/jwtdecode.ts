export interface JwtPayload {
  sub: string;
  roles: string[];
  scope: string[];
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}