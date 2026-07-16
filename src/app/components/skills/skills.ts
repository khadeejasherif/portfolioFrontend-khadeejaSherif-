import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SkillsService } from '../../services/skills-service';
import { Iskills } from '../../models/iskills';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {
  skills: Iskills[] = [];
  filteredSkills: Iskills[] = [];
  
  categories: string[] = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];
  activeCategory: string = 'All';
  isLoading: boolean = true;
  
  // --- pagination & limits ---
  isExpanded: boolean = false;
  readonly displayLimit: number = 10;

  constructor(private skillsService: SkillsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.skillsService.getSkills().subscribe({
      next: (data: any) => {
        console.log(data);
        this.skills = data.Skills;
        
        // Use the filter method here on initial load too!
        this.filterSkills(this.activeCategory);
        
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching skills:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  setCategory(category: string): void {
    this.activeCategory = category;
    this.isExpanded = false; // Reset toggle when category switches
    this.filterSkills(category);
    this.cdr.detectChanges(); 
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
    this.cdr.detectChanges();
  }

  private filterSkills(category: string): void {
    if (!this.skills || this.skills.length === 0) {
      this.filteredSkills = [];
      return;
    }

    // If 'All' is selected, display everything. Otherwise, filter by category.
    if (category.toLowerCase() === 'all') {
      this.filteredSkills = this.skills;
    } else {
      this.filteredSkills = this.skills.filter(
        skill => skill.category && skill.category.toLowerCase() === category.toLowerCase()
      );
    }
  }
}