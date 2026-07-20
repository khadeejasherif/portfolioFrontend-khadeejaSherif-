import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core'; // 1. Import ChangeDetectorRef
import { Project } from "./project/project"
import { Iprojects } from "../../models/iprojects";
import { ProjectService } from "../../services/project-service"

import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [Project],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class Projects implements OnDestroy {
  projects: Iprojects[] = [];
  private swiperInstance: Swiper | undefined;

 // Inject ChangeDetectorRef in the constructor
  constructor(
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef 
  ) {
    this.projectService.getProjects().subscribe({
      next: (data: any) => { 
        console.log("Projects loaded:", data);
        this.projects = data.projects;

        // 3. Force Angular to update the UI with the new array
        this.cdr.detectChanges(); 

        // 4. Initialize Swiper now that the DOM matches the array
        setTimeout(() => {
          this.initSwiper();
        }, 50);
      },
      error: (error) => { 
        console.error("Error fetching projects:", error); 
      },
      complete: () => { 
        console.log("Finish loading"); 
      }
    });
  }

  // private initSwiper() {
  //   if (this.swiperInstance) {
  //     this.swiperInstance.destroy(true, true);
  //   }

  //   this.swiperInstance = new Swiper('.mySwiper', {
  //     modules: [Pagination, Autoplay],
  //     slidesPerView: 1,
  //     spaceBetween: 32,
  //     autoplay: {
  //       delay: 4000,
  //       disableOnInteraction: false
  //     },
  //     pagination: {
  //       el: '.swiper-pagination',
  //       clickable: true,
  //     },
  //     breakpoints: {
  //       640: { slidesPerView: 2 },
  //       1024: { slidesPerView: 3 }
  //     }
  //   });
  // }
private initSwiper() {
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
    }

    this.swiperInstance = new Swiper('.mySwiper', {
      modules: [Pagination, Autoplay],
      slidesPerView: 1, // Default for mobile
      spaceBetween: 24,
      observer: true,
      observeParents: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        // When window width is >= 0px (Phones)
        0: {
          slidesPerView: 1,
          spaceBetween: 16
        },
        // When window width is >= 640px (Tablets)
        640: {
          slidesPerView: 2,
          spaceBetween: 24
        },
        // When window width is >= 1024px (Desktops)
        1024: {
          slidesPerView: 3,
          spaceBetween: 32
        }
      }
    });
  }
  
  ngOnDestroy() {
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
    }
  }
}