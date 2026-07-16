import { Component, signal } from '@angular/core';
import { RouterOutlet,RouterModule, Router } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Dashboard } from './components/dashboard/dashboard';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar ,Footer,RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');
  constructor(public router: Router) {
    console.log(this.router.url)
  }

  
}
