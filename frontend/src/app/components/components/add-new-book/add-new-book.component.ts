import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzDatePickerSizeType } from 'ng-zorro-antd/date-picker';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-new-book',
  standalone: false,
  templateUrl: './add-new-book.component.html',
  styleUrl: './add-new-book.component.scss'
})




export class AddNewBookComponent {
  private fb = inject(NonNullableFormBuilder);
  private http = inject(HttpClient);
  size: NzButtonSize = 'large';
  dropdownSize: NzSelectSizeType = 'large';
  Datesize: NzDatePickerSizeType = 'default';
  addNewBookFrm : any
  uploadedFile: any;
  editBookId : any;
  getParticularBook : any;
  categoryData: any;
  constructor(private router : Router, 
    private i18n: NzI18nService,
  private toastr : ToastrService,
private route : ActivatedRoute){}
  ngOnInit(){
    this.editBookId = this.route.snapshot.paramMap.get('id') as string;
    if(this.editBookId){
      this.getParticularBookData()
    }
    this.ValidateBookFrm();
    this.getCategory();
  }


  getCategory(){
    this.http.get('http://localhost:3000/category', {withCredentials : true})
    .subscribe({
      next: (response:any) => {
        this.categoryData = response.data;
      },
      error: (error) => {
      }
    });
  }

  getParticularBookData(){
    this.http.get('http://localhost:3000/book/view?id=' + this.editBookId , {withCredentials : true})
    .subscribe({
      next: (response:any) => {
        if(response.status){
          this.getParticularBook = response.data
          this.setBookValue()
        }else{
          this.toastr.error(response.message);
        }
    
      
      },
      error: (error) => {
        this.toastr.error(error.message);

      }
  })
}

setBookValue(){
  this.addNewBookFrm.patchValue({
    title: this.getParticularBook.title,
    description: this.getParticularBook.description,
    condition: this.getParticularBook.condition,
    price: this.getParticularBook.price,
    category: this.getParticularBook.category,
    edition: this.getParticularBook.edition,
    buyDate: this.getParticularBook.buyDate ? new Date(this.getParticularBook.buyDate) : null,
  });
}


  ValidateBookFrm(){
    this.addNewBookFrm = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      condition : this.fb.control('', [Validators.required]),
      
      price : this.fb.control('', [Validators.required]),
      category : this.fb.control('', [Validators.required]),
      edition  : this.fb.control('', [Validators.required]),
      buyDate  : this.fb.control(null, [Validators.required]),
      file : this.fb.control([]),
    });
  }


  date = null;
  isEnglish = false;

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log('week: ', this.getISOWeek(result));
  }



  submitForm(): void {
    if (this.addNewBookFrm.valid) {
      console.log('submit', this.addNewBookFrm.value);
      const formData = new FormData();
     
      formData.append('title', this.addNewBookFrm.value.title)
      formData.append('description', this.addNewBookFrm.value.description)
      formData.append('condition', this.addNewBookFrm.value.condition)
      formData.append('price',this.addNewBookFrm.value.price)
      formData.append('category', this.addNewBookFrm.value.category)
      formData.append('edition', this.addNewBookFrm.value.edition)
      formData.append('buyDate', this.addNewBookFrm.value.buyDate)
      formData.append('file', this.uploadedFile)




      if(this.editBookId == null) {
        this.http.post( 'http://localhost:3000/book/create',  formData, {withCredentials : true})
        .subscribe({
          next: (response:any) => {
  
            if(response.status){
            this.router.navigateByUrl('/management/my-books');
            this.toastr.success(response.message);
            }else{
              this.toastr.error(response.message);
            }
        
          
          },
          error: (error) => {
            this.toastr.error(error.message);
  
          }
        });
      }else{

        delete this.addNewBookFrm.value.file;
        this.http.patch( 'http://localhost:3000/book/update?id=' + this.editBookId ,  this.addNewBookFrm.value, {withCredentials : true})
        .subscribe({
          next: (response:any) => {
            if(response.status){
            this.router.navigateByUrl('/management/my-books');
            this.toastr.success(response.message);
            }else{
              this.toastr.error(response.message);
            }
          },
          error: (error) => {
            this.toastr.error(error.error.message);
  
          }
        });
      }
     


    } else {
      Object.values(this.addNewBookFrm.controls).forEach((control:any) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


  // upload file


  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;


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
  
  getISOWeek(result: Date): any {
    throw new Error('Function not implemented.');
  }
}


