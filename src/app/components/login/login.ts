import { Component } from '@angular/core';
import { UserServices } from '../../services/user-services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm!: FormGroup;

  //  notification configuration
  private Toast = Swal.mixin({
    toast: true,
    position: 'top-end',             // Corner alignment
    showConfirmButton: false,        // No ugly buttons
    timer: 2000,                     // Closes automatically after 2 seconds
    timerProgressBar: true,          // Visual countdown line
    background: '#121212',         
    color: '#ffffff',
    customClass: {
      popup: 'rounded-2xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] font-sans text-xs uppercase tracking-wider'
    }
  });

  constructor(
    private fb: FormBuilder,
    private UserService: UserServices,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  loginFunc() {
    if (this.loginForm.invalid) return;

    this.UserService.userLogin(this.loginForm.value).subscribe({
      next: (res: any) => {
       localStorage.setItem('isAuth', res.token);
        
        this.UserService.getProfile().subscribe({
          next: (profileRes: any) => {
            
            //  Fire the success notification
            this.Toast.fire({
              icon: 'success',
              title: 'Access Granted'
            });

            // Navigation
            if (profileRes && profileRes.user && profileRes.user.role === 'admin') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/home']);
            }

          },
          error: (profileErr) => {
            console.error(profileErr);
            this.router.navigate(['/home']);
          }
        });
      },
      error: (err: any) => {
        console.error(err);
        
        // failure notification 
        this.Toast.fire({
          icon: 'error',
          title: 'Authentication Mismatch'
        });
      }
    });
  }
}
