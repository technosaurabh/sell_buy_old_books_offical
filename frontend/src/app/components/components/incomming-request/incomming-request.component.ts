import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { NzUploadFile } from 'ng-zorro-antd/upload';
@Component({
  selector: 'app-incomming-request',
  standalone: false,
  templateUrl: './incomming-request.component.html',
  styleUrl: './incomming-request.component.scss'
})
export class IncommingRequestComponent {
  private http = inject(HttpClient);
  private modal = inject(NzModalService);
  private toaster = inject(ToastrService);
  incomingRequest : any;
  baseUrl : any = 'http://82.29.165.214:3000/';
 

  ngOnInit(){
   this.getBook();
  }

  getBook(){
    this.http.get('http://82.29.165.214:3000/request/pendingRequest', {withCredentials : true})
    .subscribe({
      next: (response:any) => {
        this.incomingRequest = response.data
      },
      error: (error:any) => {
        this.toaster.error(error.message);
      }
    });
  }


  acceptReject(book:any, action:any){

    let body = {
      bookId : book?.bookId?._id,
      status : action
    }

    this.http.patch('http://82.29.165.214:3000/request/reviewConnection?id=' + book?._id, body,  {withCredentials : true})
    .subscribe({
      next: (response:any) => {

        if(response.success){
        // this.incomingRequest = response.data;
        this.toaster.success(response.message);
        this.getBook();
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
