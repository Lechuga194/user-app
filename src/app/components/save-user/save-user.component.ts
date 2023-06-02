import {Component, OnInit} from '@angular/core';
import {User, UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css']
})
export class SaveUserComponent implements OnInit{

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
      if(idParam) {
        this.UserService.getUser(idParam).subscribe(res => {
          this.user = res as User
        })

      }
    })
  }

  save() {
    if(this.user.id) {
      this.UserService.updateUser(this.user).subscribe();
    } else {
      this.UserService.saveUser(this.user).subscribe();
    }
    this.router.navigate(['/home'])
  }

}
