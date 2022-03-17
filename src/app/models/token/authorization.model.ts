export class AuthorizationDTO {
  grant_type: string | undefined | null = null;
  client_id: string | undefined | null = null;
  client_secret: string | undefined | null = null;
  scope: string | undefined | null = null;
}
