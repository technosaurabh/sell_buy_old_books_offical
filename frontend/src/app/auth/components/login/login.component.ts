import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private http = inject(HttpClient);
  size: NzButtonSize = 'large';


  constructor(private router : Router,
    private toastr: ToastrService
  ){}

  validateForm = this.fb.group({
    emailId: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      
      const payload = this.validateForm.value;
      this.http.post('http://82.29.165.214:3000/login', payload, {withCredentials : true})
      .subscribe({
        next: (response:any) => {
          if(response.status){
            this.router.navigateByUrl('/user/dashboard');
            this.toastr.success(response.message);
          }else{
            this.toastr.error( response.message);
          }

   
  
        },
        error: (error) => {
          // console.log(error.error.message);
          this.toastr.error('Error !', error.error.message);

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
