import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {SaveUserComponent} from "./components/save-user/save-user.component";

const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: SaveUserComponent},
  {path: 'home', component: HomeComponent},
  {path: 'save', component: SaveUserComponent},
  {path: 'save/:id', component: SaveUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
