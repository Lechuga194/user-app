import {Component, OnInit} from '@angular/core';
import {UserService, User} from "../../services/user.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  loggedUserId = '';
  usersList: User[] = [];
  constructor(
    private UserService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  /**
   * On load, we check if the request params has a loggedUserId and if so we get all the data of the users
   * otherwise we take the user back to the login
   * In this simple login system we are logged if loggedUserId has a value
   */
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.loggedUserId = params['loggedUserId'];
      if(this.loggedUserId) {
        this.getAllUsers();
      } else {
        this.router.navigate(['/login'])
      }
    })
  }

  getAllUsers() {
    this.UserService.getAllUsers().subscribe(
      res => {
        this.usersList = res as User[];
      },error => {
        console.log(error)
      }
    )
  }

  addUser() {
    this.router.navigate([`/save`], { queryParams: { loggedUserId: this.loggedUserId } })
  }

  logOut() {
    this.loggedUserId = '';
    this.router.navigate([`/login`])
  }

  /**
   * This method takes the id of a user and checks if we are logged and if so deletes the user
   * In this simple login system we are logged if loggedUserId has a value
   * @param id
   */
  removeUser(id: string | undefined) {
    if(!id || !this.loggedUserId) return;
    this.UserService.removeUser(id).subscribe(
      _res => {
        this.getAllUsers();
      },
      error => {
        console.log(error)
      }
    );
  }

  updateUser(id: string | undefined) {
    if(!id) return;
    this.router.navigate(['/save'], { queryParams: { id, loggedUserId: this.loggedUserId } })
  }

}
