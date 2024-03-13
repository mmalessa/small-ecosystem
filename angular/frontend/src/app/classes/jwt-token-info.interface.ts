export interface JwtTokenInfo {
  authorities: string[],
  username: string,
  firstName: string,
  lastName: string,
  exp: number
}
