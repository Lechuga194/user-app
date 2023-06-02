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

  /**
   * this checks if the email and password are valid for a user
   * the email is stored in plain text and the password is hashed using bcrypt
   * If the credentials are valid we go home (list of all users)
   */
  login() {
    this.UserService.login(this.email, this.password).subscribe(
      res => {
        const user: User = res as User;
        this.router.navigate(['/home'], { queryParams: { loggedUserId: user.id } })
      }
    );
  }

  register() {
    this.router.navigate(['/register'])
  }

}
