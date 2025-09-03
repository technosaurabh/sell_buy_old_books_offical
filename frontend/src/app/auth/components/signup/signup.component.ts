import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(private route: Router){}

  private fb = inject(NonNullableFormBuilder);
  private http = inject(HttpClient);
  size: NzButtonSize = 'large';
  validateForm = this.fb.group({
    firstName : this.fb.control('', [Validators.required]),
    lastName : this.fb.control('', [Validators.required]),
    emailId: this.fb.control('', [Validators.required]),
    phoneNumber : this.fb.control('', [Validators.required]),
    address: this.fb.control('', [Validators.required]),
    gender:  this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const payload = this.validateForm.value;
      this.http.post('http://82.29.165.214:3000/register', payload, {withCredentials : true})
      .subscribe({
        next: (response: any) => {
          console.log('Login Success ✅', response);
          // You can redirect or store token here
          this.route.navigateByUrl('')
        },
        error: (error: any) => {
          console.error('Login Failed ❌', error);
        }
      });


    } else {
      Object.values(this.validateForm.controls).forEach((control:any) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
