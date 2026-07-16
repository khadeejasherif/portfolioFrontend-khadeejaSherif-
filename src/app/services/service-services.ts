import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iservices } from '../models/iservices';

@Injectable({
  providedIn: 'root',
})
export class ServiceServices {

  private apiUrl = 'http://localhost:3000/services'; 

  constructor(private HttpClient: HttpClient) {
    
  }

  // HTTPCLIENT>> HTTPCLIENT service >>methods///observable //package//RXJS
  getServices() {
    return this.HttpClient.get(this.apiUrl);
  }

  getService(id: string) {
    return this.HttpClient.get(this.apiUrl + '/' + id);
  }

  addService(service: Iservices) {
    return this.HttpClient.post(this.apiUrl, service);
  }

  updateService(id: string, service: Iservices) {
    return this.HttpClient.put(this.apiUrl + '/' + id, service);
  }

  deleteService(id: string) {
    return this.HttpClient.delete(this.apiUrl + '/' + id);
  }





}
