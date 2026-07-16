import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iprojects } from '../models/iprojects';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  // backend URL
  private apiUrl = 'http://localhost:3000/projects'; 

  // Inject HttpClient via the constructor
  constructor(private http: HttpClient) {}

  // GET ALL PROJECTS 
  getProjects(): Observable<Iprojects[]> {
    return this.http.get<Iprojects[]>(this.apiUrl);
  }

  // GET SINGLE PROJECT 
  getProjectById(id: string): Observable<Iprojects> {
    return this.http.get<Iprojects>(`${this.apiUrl}/${id}`);
  }

  //  CREATE PROJECT 
  createProject(projectData: Iprojects): Observable<Iprojects> {
    return this.http.post<Iprojects>(this.apiUrl, projectData);
  }

  //UPDATE PROJECT -> projectRouter.put("/:id", isAuth, isAdmin, updateProjects)
  updateProject(id: string, projectData: Partial<Iprojects>): Observable<Iprojects> {
    return this.http.put<Iprojects>(`${this.apiUrl}/${id}`, projectData);
  }

  //  DELETE PROJECT -> projectRouter.delete("/:id", isAuth, isAdmin, deleteProjects)
  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}