export class TokenDTO {
  access_token: string | undefined | null = null;
  expires_in: number | undefined | null = null;
  token_type: string | undefined | null = null;
  scope: string | undefined | null = null;
}
