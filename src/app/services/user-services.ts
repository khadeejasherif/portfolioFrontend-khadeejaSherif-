import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iuser } from '../models/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
 
  private baseUrl = 'http://localhost:3000/api/users';
  constructor(private httpClient: HttpClient) {}

getUsers() {
    return this.httpClient.get(`${this.baseUrl}`);
  }

  addUser(user: Iuser) {
    return this.httpClient.post(`${this.baseUrl}/Register`, user);
  }

  userLogin(data: { email: string; password: string }) {
   
    return this.httpClient.post(`${this.baseUrl}/Login`, data);
  }

  getProfile() {
    return this.httpClient.get(`${this.baseUrl}/profile`); 
  }
}