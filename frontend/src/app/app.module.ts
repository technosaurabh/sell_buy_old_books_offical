import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UserRoutesModule } from './shared/user-routes/user-routes.module';
import { DashboardComponent } from './shared/user-routes/dashboard/dashboard.component';
import { HeaderComponent } from './shared/user-routes/header/header.component';
import { FooterComponent } from './shared/user-routes/footer/footer.component';
import { SidebarComponent } from './shared/user-routes/sidebar/sidebar.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
import { ToastrModule } from 'ngx-toastr';
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import { MailOutline, AppstoreOutline, SettingOutline, DashboardOutline, BookOutline, CodeSandboxOutline, PullRequestOutline, PlusOutline, InsertRowLeftOutline, DoubleRightOutline, DoubleLeftOutline, LinkOutline } from '@ant-design/icons-angular/icons';
import {
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    UserRoutesModule,
    NzDropDownModule,
    NzIconModule,
    NzMenuModule,
    NzIconModule.forRoot([ MailOutline, AppstoreOutline, SettingOutline, DashboardOutline, BookOutline, CodeSandboxOutline, PullRequestOutline, PlusOutline, InsertRowLeftOutline, DoubleRightOutline, DoubleLeftOutline , LinkOutline]),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar : true,
    }),
  ],
  providers: [provideNzI18n(en_US)],
  bootstrap: [AppComponent]
})
export class AppModule { }
