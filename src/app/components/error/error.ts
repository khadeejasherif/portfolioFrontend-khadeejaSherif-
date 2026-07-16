import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  imports: [CommonModule,RouterModule ],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class Error {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }
}
