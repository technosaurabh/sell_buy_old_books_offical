import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { MyBooksComponent } from './my-books/my-books.component';
import { AddNewBookComponent } from './add-new-book/add-new-book.component'; 
import {
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDirective } from '@ant-design/icons-angular';
import { NzFormItemComponent } from "ng-zorro-antd/form";
import { NzColDirective } from "ng-zorro-antd/grid";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { OutgoingRequestComponent } from './outgoing-request/outgoing-request.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { IncommingRequestComponent } from './incomming-request/incomming-request.component';
import { ConnectionsComponent } from './connections/connections.component';
@NgModule({
  declarations: [
    ProfileComponent,
    MyBooksComponent,
    AddNewBookComponent,
    CategoryComponent,
    AddCategoryComponent,
    OutgoingRequestComponent,
    IncommingRequestComponent,
    ConnectionsComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzColDirective,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    IconDirective,
    NzSelectModule,
    NzUploadModule,
    NzDatePickerModule,
    NzModalModule,
    NzTableModule,
    NzBadgeModule
]
})
export class ComponentsModule { }
