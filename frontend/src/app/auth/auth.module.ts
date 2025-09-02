import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './constant/not-found/not-found.component';
import {
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDirective } from '@ant-design/icons-angular';

import { HttpClientModule } from '@angular/common/http'; 
@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule, 
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    IconDirective,
    HttpClientModule
  ],
 
})
export class AuthModule { }
