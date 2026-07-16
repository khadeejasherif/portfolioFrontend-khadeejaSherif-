import { Injectable } from '@angular/core';

import { Icontact } from '../models/icontact';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactServices {
  private apiUrl = 'http://localhost:3000/contactUs';



  constructor(private HttpClient: HttpClient) {}


  submitMessage(messageData: Icontact) {
    return this.HttpClient.post(this.apiUrl, messageData);
  }

 getMessages() {
    return this.HttpClient.get(this.apiUrl);
  }

  getMessage(id: string) {
    return this.HttpClient.get(this.apiUrl + '/' + id);
  }
  deleteMessage(id: string) {
    return this.HttpClient.delete(this.apiUrl + '/' + id);
  }
}

