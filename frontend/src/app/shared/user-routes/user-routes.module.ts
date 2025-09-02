import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HttpClientModule } from '@angular/common/http'; 
const routes : Routes = [
  {
    path : 'dashboard',
    component : DashboardComponent
  }
]


@NgModule({
  declarations: [
    // HeaderComponent,
    // FooterComponent,
    // SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzDropDownModule,
    NzIconModule,
    NzMenuModule,
    HttpClientModule
  ]
})
export class UserRoutesModule { }
