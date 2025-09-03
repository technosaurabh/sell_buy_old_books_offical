import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private http = inject(HttpClient);
  private toaster = inject(ToastrService)
  bookFeed : any;
  baseUrl : any = 'http://82.29.165.214:3000/'
  ngOnInit(){
  this.getBookFeed();
  }

  getBookFeed(){
    this.http.get('http://82.29.165.214:3000/book/feed', {withCredentials : true})
    .subscribe({
      next: (response:any) => {
        this.bookFeed = response.data
   
      },
      error: (error:any) => {
      }
    });
  }

  sendRequest(book:any){
    let bookId = book._id;
    this.http.post('http://82.29.165.214:3000/request/sendconnection?bookId=' + bookId, {},  {withCredentials : true})
    .subscribe({
      next: (response:any) => {

        if(response.success){
          this.toaster.success(response.message);
         this.getBookFeed();


        }else{
          this.toaster.error(response.message);

        }
      },
      error: (error:any) => {
        this.toaster.error(error.error.message);

      }
    });
  }




}
