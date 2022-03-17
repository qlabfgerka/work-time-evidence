import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthorizationDTO } from 'src/app/models/token/authorization.model';
import { TokenDTO } from 'src/app/models/token/token.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN: string = 'JWT_TOKEN';

  constructor(private readonly httpClient: HttpClient) {}

  public authorize(auth: AuthorizationDTO): Observable<void> {
    const body = new URLSearchParams({
      grant_type: auth.grant_type!,
      client_id: auth.client_id!,
      client_secret: auth.client_secret!,
      scope: auth.scope!,
    });

    const options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };

    return this.httpClient
      .post<TokenDTO>(
        `${environment['login-hostname']}`,
        body.toString(),
        options
      )
      .pipe(
        map((tokens: TokenDTO) => {
          this.saveToken(tokens);
        })
      );
  }

  public saveToken(token: TokenDTO): void {
    localStorage.setItem(this.TOKEN, token.access_token!);
  }

  public getToken(): string {
    return localStorage.getItem(this.TOKEN)!;
  }

  public deleteToken(): void {
    localStorage.removeItem(this.TOKEN);
  }
}
