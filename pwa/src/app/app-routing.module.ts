import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
  { path: 'wallet', loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletModule) },
  { path: 'lifestyle', loadChildren: () => import('./lifestyle/lifestyle.module').then(m => m.LifestyleModule) },
  { path: 'error404', loadChildren: () => import('./error404/error404.module').then(m => m.Error404Module) },
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'home', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'shoobplaceholder', loadChildren: () => import('./shoobplaceholder/shoobplaceholder.module').then(m => m.ShoobplaceholderModule) },
  { path: '**', redirectTo: 'error404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
