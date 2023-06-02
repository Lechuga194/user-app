import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface User {
  id?: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  password?: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiRoute = '/api' //TODO REPLACE FOR ENV VAR
  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get(this.apiRoute)
  }

  getUser(id: string) {
    return this.httpClient.get(`${this.apiRoute}/${id}`)
  }

  saveUser(user: User) {
    return this.httpClient.post(this.apiRoute, user);
  }

  removeUser(id: number) {
    return this.httpClient.delete(`${this.apiRoute}/${id}`)
  }

  updateUser(user: User) {
    return this.httpClient.put(this.apiRoute, user);
  }

  login(email: string, password: string) {
    return this.httpClient.post(`${this.apiRoute}/login`, { email, password })
  }

}
