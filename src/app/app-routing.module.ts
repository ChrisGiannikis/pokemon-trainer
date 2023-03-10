import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginPage } from './pages/login/login.page';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { ProfilePage } from './pages/profile/profile.page';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo: "/login"
  },
  {
    path: "login",
    component: LoginPage
  },
  {
    path: "pokemon",
    component: PokemonCataloguePage,
    canActivate:[AuthGuard]
  },
  {
    path: "profile",
    component: ProfilePage,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //import a module
  exports: [RouterModule] //expose module and its features
})
export class AppRoutingModule { }
