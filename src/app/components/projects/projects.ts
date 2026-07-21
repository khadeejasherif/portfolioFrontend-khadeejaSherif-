import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Project } from "./project/project"
import { Iprojects } from "../../models/iprojects";
import { ProjectService } from "../../services/project-service"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [Project, CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class Projects implements OnInit, AfterViewInit, OnDestroy {
  projects: Iprojects[] = [];
  private swiperInstance: Swiper | undefined;

  constructor(
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  ngAfterViewInit(): void {
    // Component view is ready
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data: any) => { 
        console.log("Projects loaded:", data);
        this.projects = data.projects;

        // Force Angular to render the slides into the DOM
        this.cdr.detectChanges(); 

        // Initialize Swiper safely after the DOM updates
        setTimeout(() => {
          this.initSwiper();
        }, 100);
      },
      error: (error) => { 
        console.error("Error fetching projects:", error); 
      }
    });
  }

  private initSwiper() {
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
    }

    this.swiperInstance = new Swiper('.mySwiper', {
      modules: [Pagination, Autoplay],
      slidesPerView: 1, 
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
        0: {
          slidesPerView: 1,
          spaceBetween: 16
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 24
        },
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