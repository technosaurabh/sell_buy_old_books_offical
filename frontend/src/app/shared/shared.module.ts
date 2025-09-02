import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NzDropDownModule,
    NzIconModule,
    NzMenuModule
  ]
})
export class SharedModule { }
