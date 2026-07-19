import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { UserServices } from '../../services/user-services';
import { ProjectService } from '../../services/project-service';
import { SkillsService } from '../../services/skills-service';
import { ServiceServices } from '../../services/service-services';
import { CvService } from '../../services/cv-service';

type DashboardSection = 'projects' | 'cv' | 'skills' | 'services' | 'contact';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  activeSection: DashboardSection = 'projects';
  isSidebarOpen: boolean = true;
  isLoading: boolean = false;

  itemsList: any[] = [];
  
  private databaseCollections: Record<string, any[]> = {
    projects: [],
    skills: [],
    services: [],
    cv: [],
    contact: []
  };

  isModalOpen: boolean = false;
  isEditing: boolean = false;
  
  // Adaptive initialization layer resolving form field bindings
  currentItem: any = this.getEmptyFormModel();
  projectTagsInput: string = '';

  // Sleek notification toast configuration
  private Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    background: '#121212',
    color: '#ffffff',
    customClass: {
      popup: 'rounded-2xl border border-white/5 shadow-2xl text-xs uppercase tracking-wider'
    }
  });

  constructor(
    private authService: UserServices,
    private cvService: CvService,
    private projectService: ProjectService, 
    private skillService: SkillsService,     
    private serviceService: ServiceServices, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAllDashboardData();
  }
  selectedFile: File | null = null;

 
  private getEmptyFormModel() {
    return {
      _id: '',
      title: '',
      description: '',
      imageUrl: '',
      image_url: '', // structural fallback matching skills response
      tags: [] as string[],
      demoUrl: '',
      githubUrl: '',
      order: 0,
      featured: false,
      name: '',
      category: 'Frontend'
    };
  }

  loadAllDashboardData(): void {
    this.isLoading = true;
    this.cdr.detectChanges();

    forkJoin({
      projectsData: this.projectService.getProjects(),
      servicesData: this.serviceService.getServices(),
      skillsData: this.skillService.getSkills(),
      cvData: this.cvService.getLatestCv()
    }).subscribe({
      next: (res: any) => {
       
        this.databaseCollections['projects'] = res.projectsData?.projects || [];
        this.databaseCollections['services'] = res.servicesData?.Service || [];
        this.databaseCollections['skills'] = res.skillsData?.Skills || [];
        this.databaseCollections['cv'] = res.cvData ? [res.cvData] : [];
        this.updateVisibleTable();
      },
      error: (err) => {
        console.error('Sync failure:', err);
      },
      complete: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  setSection(section: DashboardSection): void {
    this.activeSection = section;
    this.updateVisibleTable();
  }

  private updateVisibleTable(): void {
    this.itemsList = this.databaseCollections[this.activeSection] || [];
    this.cdr.detectChanges();
  }

// Add this to your Dashboard class
onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
    // Optional: Auto-fill the title if needed
    this.currentItem.title = file.name;
  }
}


  // --- Modal Forms Operation Handles ---
  openAddModal(): void {
    this.isEditing = false;
    this.currentItem = this.getEmptyFormModel();
    this.projectTagsInput = '';
    this.isModalOpen = true;
    this.cdr.detectChanges();
  }

  openEditModal(item: any): void {
    this.isEditing = true;
    this.currentItem = { ...this.getEmptyFormModel(), ...item };
    
    // handle tags array
    if (this.activeSection === 'projects' && this.currentItem.tags) {
      this.projectTagsInput = this.currentItem.tags.join(', ');
    }
    
    this.isModalOpen = true;
    this.cdr.detectChanges();
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.cdr.detectChanges();
  }


  onSaveItem(): void {
   
    const payload = { ...this.currentItem };

    //  Clear out the empty _id string 
    if (!this.isEditing) {
      delete payload._id;
    }

    // --- PROJECTS OPERATION HANDLER ---
    if (this.activeSection === 'projects') {
      // Re-compile project tags array cleanly before sending over network
      payload.tags = this.projectTagsInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      if (this.isEditing) {
        this.projectService.updateProject(this.currentItem._id, payload).subscribe({
          next: () => {
            this.Toast.fire({ icon: 'success', title: 'Project updated successfully' });
            this.loadAllDashboardData(); 
          },
          error: (err: any) => console.error(err)
        });
      } else {
        this.projectService.createProject(payload).subscribe({
          next: () => {
            this.Toast.fire({ icon: 'success', title: 'Project created successfully' });
            this.loadAllDashboardData();
          },
          error: (err: any) => console.error(err)
        });
      }
    } 
    // --- SKILLS OPERATION HANDLER ---
    else if (this.activeSection === 'skills') {
      if (this.isEditing) {
        this.skillService.updateSkill(this.currentItem._id, payload).subscribe({
          next: () => {
            this.Toast.fire({ icon: 'success', title: 'Skill updated successfully' });
            this.loadAllDashboardData();
          },
          error: (err: any) => console.error(err)
        });
      } else {
        this.skillService.createSkill(payload).subscribe({
          next: () => {
            this.Toast.fire({ icon: 'success', title: 'Skill created successfully' });
            this.loadAllDashboardData();
          },
          error: (err: any) => console.error(err)
        });
      }
    } 

// Add this property to your class variables


// Update the switch/if-else logic in onSaveItem()
else if (this.activeSection === 'cv') {
  if (!this.selectedFile) {
    this.Toast.fire({ icon: 'error', title: 'Please select a file' });
    return;
  }
  this.cvService.uploadCv(this.selectedFile, this.currentItem.title).subscribe({
    next: () => {
      this.Toast.fire({ icon: 'success', title: 'CV uploaded successfully' });
      this.loadAllDashboardData();
    },
    error: (err) => console.error(err)
  });
}



    // --- SERVICES OPERATION HANDLER ---
    else if (this.activeSection === 'services') {
      if (this.isEditing) {
        this.serviceService.updateService(this.currentItem._id, payload).subscribe({
          next: () => {
            this.Toast.fire({ icon: 'success', title: 'Service updated successfully' });
            this.loadAllDashboardData();
          },
          error: (err: any) => console.error(err)
        });
      } else {
        this.serviceService.addService(payload).subscribe({
          next: () => {
            this.Toast.fire({ icon: 'success', title: 'Service created successfully' });
            this.loadAllDashboardData();
          },
          error: (err: any) => console.error(err)
        });
      }
    } else {
      this.Toast.fire({ icon: 'info', title: `Saved change to ${this.activeSection}` });
    }
    
    this.closeModal();
  }

  /*
   Safe removal operations linked with SweetAlert confirmation boxes
   */
  onDeleteItem(id: string): void {
    Swal.fire({
      title: 'ARE YOU SURE?',
      text: "This collection record will be permanently deleted.",
      icon: 'warning',
      showCancelButton: true,
      background: '#121212',
      color: '#ffffff',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#262626',
      confirmButtonText: 'DELETE RECORD'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.activeSection === 'projects') {
          this.projectService.deleteProject(id).subscribe({
            next: () => {
              this.Toast.fire({ icon: 'success', title: 'Document removed' });
              this.loadAllDashboardData();
            },
            error: (err: any) => console.error(err)
          });
        } 
        else if (this.activeSection === 'skills') {
          this.skillService.deleteSkill(id).subscribe({
            next: () => {
              this.Toast.fire({ icon: 'success', title: 'Skill removed' });
              this.loadAllDashboardData();
            },
            error: (err: any) => console.error(err)
          });
        }
else if (this.activeSection === 'cv') {
      // Since your backend overwrites instead of deletes, 
      // you could simply inform the user or do nothing.
      this.Toast.fire({ icon: 'info', title: 'CVs are replaced upon new upload, not deleted.' });
    }




        else if (this.activeSection === 'services') {
          this.serviceService.deleteService(id).subscribe({
            next: () => {
              this.Toast.fire({ icon: 'success', title: 'Service removed' });
              this.loadAllDashboardData();
            },
            error: (err: any) => console.error(err)
          });
        } else {
          this.Toast.fire({ icon: 'success', title: 'Item removed' });
        }
      }
    });
  }

  onLogout(): void {
    localStorage.removeItem('isAuth'); 
    this.router.navigate(['/home']);
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.cdr.detectChanges();
  }
}