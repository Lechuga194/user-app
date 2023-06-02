import { Component } from '@angular/core';
import {User, UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private UserService: UserService,
    private router: Router
  ) {}

  login() {
    this.UserService.login(this.email, this.password).subscribe(
      res => {
        const user: User = res as User;
        this.router.navigate(['/home'], { queryParams: { loggedUserId: user.id } })
      }, _error => {
        console.log('not logged')
      }
    );
  }

  register() {
    this.router.navigate(['/register'])
  }

}
