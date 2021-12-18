import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  
  {  path: 'reset-password',
  loadChildren: () =>
    import('./pages/reset-password/reset-password.module').then(
      m => m.ResetPasswordPageModule
    )
},
{
  path: 'signup',
  loadChildren: () =>
    import('./pages/signup/signup.module').then(m => m.SignupPageModule)
},
  { path: 'registro-mascota', 
  loadChildren: () =>
   import('./pages/registro-mascota/registro-mascota.module').then(
     m => m.RegistroMascotaPageModule),
     canActivate: [AuthGuard]
},
  { path: 'registro-cita', 
  loadChildren: () =>
   import ('./pages/registro-cita/registro-cita.module').then(
     m => m.RegistroCitaPageModule),
     canActivate: [AuthGuard]
},
  { path: 'citas', 
  loadChildren: () =>
  import ('./pages/citas/citas.module').then(
    m => m.CitasPageModule),
    canActivate: [AuthGuard]
},
  { path: 'mascotas', 
  loadChildren: () =>
  import ('./pages/mascotas/mascotas.module').then(
    m => m.MascotasPageModule),
    canActivate: [AuthGuard] 
},
  { path: 'profile', 
  loadChildren:() => 
  import ('./pages/profile/profile.module').then(
    m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  { path: 'edit-mascota/:id', loadChildren: () =>
  import('./pages/edit-mascota/edit-mascota.module').then(
    m => m.EditMascotaPageModule),
    canActivate: [AuthGuard]
},
  { path: 'edit-cita/:id', loadChildren: () =>
  import('./pages/edit-cita/edit-cita.module').then(
    m => m.EditCitaPageModule),
    canActivate: [AuthGuard]
},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
