import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactServices } from '../../services/contact-services';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: FormGroup;
  isSubmitting: boolean = false;
  submitSuccess: boolean = false;
  submitError: string = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactServices,
    private cdr: ChangeDetectorRef
  ) {
    // 
    this.contactForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.minLength(10)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = '';
    this.cdr.detectChanges();

    this.contactService.submitMessage(this.contactForm.value)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          this.submitSuccess = true;
          this.contactForm.reset(); //clear form
          this.cdr.detectChanges();

          setTimeout(() => {
            this.submitSuccess = false;
            this.cdr.detectChanges();
          }, 5000);
        },
        error: (err: any) => {
          console.error('Submission failed:', err);
          this.submitError = err?.error?.message || 'Failed to send message. Please try again later.';
          this.cdr.detectChanges();
        }
      });
  }
}