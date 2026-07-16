import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Icv } from '../models/icv';
@Injectable({
  providedIn: 'root',
})
export class CvService {

  private apiUrl = 'http://localhost:3000/api/cv'; 

  constructor(private http: HttpClient) {}

  
  getLatestCv() {
    return this.http.get(this.apiUrl);
  }
}
