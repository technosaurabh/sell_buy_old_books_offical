import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { NzUploadFile } from 'ng-zorro-antd/upload';
@Component({
  selector: 'app-my-books',
  standalone: false,
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent {
  private http = inject(HttpClient);
  private modal = inject(NzModalService);
  private toaster = inject(ToastrService);
  bookFeed : any;
  baseUrl : any = 'http://localhost:3000/';
  isVisible = false;
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  uploadedFile: any;

  ngOnInit(){
   this.getBook();
  }

  getBook(){
    this.http.get('http://localhost:3000/book/mybooks', {withCredentials : true})
    .subscribe({
      next: (response:any) => {
        this.bookFeed = response.data
      },
      error: (error:any) => {
        this.toaster.error(error.message);
      }
    });
  }

  showDeleteConfirm(book:any): void {
    console.log(book, "book")
    this.modal.confirm({
      nzTitle: 'Are you sure delete ' + book.title + 'book?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteBook(book._id),
      nzCancelText: 'No',
    });
  }

  deleteBook(bookId:any){
    this.http.delete(this.baseUrl + 'book/delete?id=' + bookId, {withCredentials : true})
    .subscribe({
      next: (response:any) => {
        console.log(response);
        if(response.success){
          this.toaster.success(response.message);
          this.getBook();
        }else{
          this.toaster.error(response.message);
        }
      },
      error: (error:any) => {
        console.log(error);
        this.toaster.error(error.error.message);

      }
    },);
  }


  bookDetails: any;


  beforeUpload = (file: NzUploadFile) => {

    // this.fileList = [...this.fileList, file]
    // this.addNewBookFrm.patchValue({ file: this.fileList });
    // this.addNewBookFrm.get('file')?.updateValueAndValidity();
    // console.log(this.addNewBookFrm);
    // ⛔ Prevent auto POST to localhost
    return true;
  };
  

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await this.getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };
  
  // helper
  getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  handleFileChange(event: any): void {
// this.fileList = [...this.fileList, event]
//     this.addNewBookFrm.patchValue({ file: this.fileList });
//     this.addNewBookFrm.get('file')?.updateValueAndValidity();

    // console.log(event, "newfrm");
    this.uploadedFile = event.fileList[0].originFileObj;
    console.log(this.uploadedFile, 'uploaded file')
  }


  showModal(bookDetails:any): void {
    this.bookDetails = bookDetails
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;

    const formData = new FormData();
    formData.append('id', this.bookDetails._id);
    formData.append('file', this.uploadedFile);


    this.http.patch('http://localhost:3000/book/updatephoto', formData , {withCredentials : true})
    .subscribe({
      next: (response:any) => {
        if(response.success){
          this.toaster.success(response.message);
          this.uploadedFile = '';
          this.getBook();
        }else{
          this.toaster.error(response.message);
        }
      },
      error: (error:any) => {
        this.toaster.error(error.message);
      }
    });

  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
