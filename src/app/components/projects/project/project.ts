import { Component, Input } from '@angular/core';
import {Iprojects}from "../../../models/iprojects"

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project {
  @Input()
  project!:Iprojects;
}