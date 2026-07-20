import { Injectable } from '@angular/core';
import { Iskills } from "../models/iskills";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {

  private apiUrl = 'https://portfolio-backendend-khadeeja-sherif-khadeeja-sherifs-projects.vercel.app/skills'; 

  constructor(private http: HttpClient) {}

  // Fetch all skills
  getSkills(): Observable<Iskills[]> {
    return this.http.get<Iskills[]>(this.apiUrl);
  }

  //  Add a brand new skill document record
  createSkill(skillData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, skillData);
  }

  // Update an eskill by passing its unique ID
  updateSkill(id: string, skillData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, skillData);
  }

  //  Delete a skill permanently by ID
  deleteSkill(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}