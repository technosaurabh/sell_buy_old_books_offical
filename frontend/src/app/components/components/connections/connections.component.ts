import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { NzUploadFile } from 'ng-zorro-antd/upload';
@Component({
  selector: 'app-connections',
  standalone: false,
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.scss'
})
export class ConnectionsComponent {
  private http = inject(HttpClient);
  private modal = inject(NzModalService);
  private toaster = inject(ToastrService);
  connectionRequest : any;
  baseUrl : any = 'http://localhost:3000/';
 

  ngOnInit(){
   this.getConnections();
  }

  getConnections(){
    this.http.get('http://localhost:3000/request/connections', {withCredentials : true})
    .subscribe({
      next: (response:any) => {
        if(response.success){
        this.connectionRequest = response.data.reverse();
        this.toaster.success(response.message);


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
