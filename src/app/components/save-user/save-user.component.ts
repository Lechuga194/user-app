import {Component, OnInit} from '@angular/core';
import {User, UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css']
})
export class SaveUserComponent implements OnInit{

  loggedUserId = '';
  user: User = {
    id: '',
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

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      let idParam = params['id'];
      this.loggedUserId = params['loggedUserId'];
      if(idParam && this.loggedUserId) {
        this.UserService.getUser(idParam).subscribe(res => {
          this.user = res as User
        })

      }
    })
  }

  /**
   * If we are logged then we update or create a new user, and then we go to the home view
   * If we are not logged we can create the user and then be redirected to log in
   */
  save() {
    //If we are logged
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
