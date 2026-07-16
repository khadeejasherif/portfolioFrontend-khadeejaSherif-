import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { Skills } from '../skills/skills';

import { Services } from '../services/services';
import { Projects } from '../projects/projects';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-home',
  imports: [Hero,Skills,Projects,Services,Contact],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
