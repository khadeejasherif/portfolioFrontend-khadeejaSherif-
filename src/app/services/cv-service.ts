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

uploadCv(file: File, title?: string): Observable<{ message: string, cv: Icv }> {
  const formData = new FormData();
  
  // Change 'file' to 'cvFile' to match your backend's upload.single('cvFile')
  formData.append('cvFile', file); 
  
  if (title) {
    formData.append('title', title);
  }

  return this.http.post<{ message: string, cv: Icv }>(this.apiUrl, formData);
}
}
