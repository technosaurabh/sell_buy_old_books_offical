import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { AddNewBookComponent } from './add-new-book/add-new-book.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { OutgoingRequestComponent } from './outgoing-request/outgoing-request.component';
import { IncommingRequestComponent } from './incomming-request/incomming-request.component';
import { ConnectionsComponent } from './connections/connections.component';

const routes: Routes = [

  {
    path : 'profile',
    component : ProfileComponent
  },
  {
    path : 'my-books',
    component : MyBooksComponent
  },

  {
    path : 'add-book',
    component : AddNewBookComponent
  },
  {
    path : 'edit-book/:id',
    component : AddNewBookComponent
  },
  {
    path : 'category',
    component : CategoryComponent
  },
  {
    path : 'category/add',
    component : AddCategoryComponent
  },
  {
    path : 'request/outgoing',
    component : OutgoingRequestComponent
  },
  {
    path : 'request/incoming',
    component : IncommingRequestComponent
  },

{
  path : 'connections',
  component : ConnectionsComponent
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
