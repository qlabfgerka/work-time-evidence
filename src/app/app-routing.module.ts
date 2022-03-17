import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { UnAuthGuard } from './guards/unauth/unauth.guard';

const routes: Routes = [
  {
    path: `settings`,
    loadChildren: () =>
      import('./components/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
    canActivate: [UnAuthGuard],
  },
  {
    path: ``,
    loadChildren: () =>
      import('./components/users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
