import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthorizationDTO } from 'src/app/models/token/authorization.model';
import { AuthService } from 'src/app/services/users/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {}

  public authorize(): void {
    const auth: AuthorizationDTO = {
      client_id: environment['client-id'],
      client_secret: environment['client-secret'],
      grant_type: 'client_credentials',
      scope: 'api',
    };

    this.authService
      .authorize(auth)
      .pipe(take(1))
      .subscribe(() => {});
  }
}
