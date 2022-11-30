import { AuthGuard } from '@authG/auth.guard';
import { NotFoundComponent } from '@sharedC/not-found/not-found.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        m => m.AuthenticationModule
      ),
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'meu-cadastro',
    loadChildren: () =>
      import('./features/register/register.module').then(m => m.RegisterModule),
    canLoad: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
