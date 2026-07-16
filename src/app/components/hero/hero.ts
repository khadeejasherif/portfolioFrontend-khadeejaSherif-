import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core'; // 1. Added ChangeDetectorRef
import { Router, RouterLink } from '@angular/router';
import { CvService } from '../../services/cv-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, CommonModule],
  templateUrl: './hero.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './hero.css',
})
export class Hero {
  isDownloading: boolean = false;

  constructor(
    private router: Router, 
    private cvService: CvService,
    private cdr: ChangeDetectorRef // 2. Inject it into your constructor
  ) {}

  projectFun(){
    this.router.navigate(['/projects']);
  }

  downloadCv(): void {
    if (this.isDownloading) return;

    this.isDownloading = true;
    this.cdr.detectChanges(); // Force template to show "DOWNLOADING..." immediately

    this.cvService.getLatestCv().subscribe({
      next: (cv: any) => {
        if (cv && cv.fileUrl) {
          const link = document.createElement('a');
          link.href = cv.fileUrl;
          link.target = '_blank'; 
          link.download = `${cv.title || 'Khadeeja_Sherif_CV'}.pdf`; 
          
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // 3. Reset the state and explicitly tell Angular to refresh the template
          this.isDownloading = false; 
          this.cdr.detectChanges(); 
        } else {
          console.error('CV file URL is missing.');
          this.isDownloading = false;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Error fetching CV download path:', err);
        this.isDownloading = false;
        this.cdr.detectChanges();
      }
    });
  }
}