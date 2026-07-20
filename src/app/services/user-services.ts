import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // 1. Import HttpHeaders
import { Observable } from 'rxjs';
import { Iuser } from '../models/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  
  private baseUrl = 'https://portfolio-backendend-khadeeja-sherif-khadeeja-sherifs-projects.vercel.app/api/users';
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
    // 2. Grab the token from localStorage (make sure the key matches what you use on login)
    const token = localStorage.getItem('isAuth'); 

    // 3. Attach it to the Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });

    // 4. Pass the headers option into the GET request
    return this.httpClient.get(`${this.baseUrl}/profile`, { headers }); 
  }
}