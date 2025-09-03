import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-outgoing-request',
  standalone: false,
  templateUrl: './outgoing-request.component.html',
  styleUrl: './outgoing-request.component.scss'
})
export class OutgoingRequestComponent {
  private http  = inject(HttpClient)
  baseUrl : any = 'http://82.29.165.214:3000/';
  private toaster = inject(ToastrService);
  outGoingConnectionData : any;



  ngOnInit(){
    this.outGoingConnection();
   }

  outGoingConnection(){
    this.http.get('http://82.29.165.214:3000/request/onGoingPendingConnection', {withCredentials : true})
    .subscribe({
      next: (response:any) => {
        if(response.success){
          this.outGoingConnectionData = response.data
        this.toaster.success(response.message);

        }else{
        this.toaster.error(response.message);
        }

      },
      error: (error:any) => {
        this.toaster.error(error.message);
      }
    });
  }
}
