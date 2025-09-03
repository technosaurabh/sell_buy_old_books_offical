import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categoryData : any;

  constructor(private http : HttpClient){}

  ngOnInit(){
    this.getCategory()
  }


  getCategory(){
    this.http.get('http://82.29.165.214:3000/category', {withCredentials : true})
    .subscribe({
      next: (response:any) => {
        this.categoryData = response.data;
      },
      error: (error) => {
      }
    });
  }

}
