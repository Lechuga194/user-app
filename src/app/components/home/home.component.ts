import {Component, OnInit} from '@angular/core';
import {UserService, User} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usersList: User[] = [];
  constructor(private UserService: UserService, private router: Router) {
    this.getAllUsers();
  }

  ngOnInit() {

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
    this.router.navigate([`/save`])
  }

  removeUser(id: string | undefined) {
    if(!id) return;
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
    this.router.navigate([`/save`], { queryParams: { id } })
  }


}
