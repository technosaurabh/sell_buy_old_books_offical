import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private http = inject(HttpClient);
  userProfiledData : any;
  userProfilePic : any;



  ngOnInit(){
    this.http.get('http://localhost:3000/profile', {withCredentials : true})
    .subscribe({
      next: (response:any) => {
        console.log('Login Success ✅', response);
        this.userProfiledData = response.data;
        this.userProfilePic = response.data.profilePic
        // You can redirect or store token here
        setTimeout(() => {
  
        }, 5000);
      },
      error: (error) => {
        console.error('Login Failed ❌', error);
      }
    });
  }


}
