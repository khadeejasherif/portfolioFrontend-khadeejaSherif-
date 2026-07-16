import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServiceServices } from '../../services/service-services'; // Adjust path as needed
import { Iservices } from '../../models/iservices';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  services: Iservices[] = [];
  isLoading: boolean = true;

  // --- pagination & limits ---
  isExpanded: boolean = false;
  readonly displayLimit: number = 6;

  

  constructor(
    private servicesService:ServiceServices, 
    private cdr: ChangeDetectorRef,
    private router:Router
  ) {


    // 2. Fetch fresh data from MongoDB in the background
    this.servicesService.getServices().subscribe({
      next: (data: any) => {
        console.log(data)
        if (data && data.Service) {
          this.services = data.Service;
          this.sortServices();
          
          
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching services:', err);
        if (this.services.length === 0) {
          this.isLoading = false;
        }
        this.cdr.detectChanges();
      }
    });
  }

  // Getter to return either the limited set or the full set of services
  get displayedServices(): Iservices[] {
    if (this.isExpanded) {
      return this.services;
    }
    return this.services.slice(0, this.displayLimit);
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
    this.cdr.detectChanges();
  }

  // Helper to sort services based on the Schema's "order" key
  private sortServices(): void {
    this.services.sort((a, b) => (a.order || 0) - (b.order || 0));
  }
navigateTo(){
  this.router.navigate(["/contact"]);
  window.scrollTo({ top: 0, behavior: 'smooth' });

}

  }


