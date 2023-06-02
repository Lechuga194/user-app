import {Component, OnInit} from '@angular/core';
import {User, UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css']
})
export class SaveUserComponent implements OnInit{

  loggedUserId = 0;
  user: User = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    username: '',
    password: ''
  }

  constructor(
    private UserService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  /**
   * On load, we check if we are logged and if the request params has the id of a user (idUser)
   * If idUser exists then we get the info of that user and fill the form with it
   */
  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      let idUser = params['id'];
      this.loggedUserId = params['loggedUserId'];
      if(idUser && this.loggedUserId) {
        this.UserService.getUser(idUser).subscribe(res => {
          this.user = res as User
        })

      }
    })
  }

  /**
   * If we are logged then we update or create a new user, and then we go to the home view
   * If we are not logged we can create the user and then be redirected to log in.
   * In this simple login system we are logged if loggedUserId has a value
   */
  save() {
    if(this.loggedUserId) {
      if(this.user.id) {
        this.UserService.updateUser(this.user).subscribe();
      } else {
        this.UserService.saveUser(this.user).subscribe();
      }
      this.home();
    } else {
      this.UserService.saveUser(this.user).subscribe();
      this.login();
    }
  }

  home() {
    this.router.navigate(['/home'], { queryParams: { loggedUserId: this.loggedUserId } })
  }

  login() {
    this.router.navigate(['/login'])
  }

}
