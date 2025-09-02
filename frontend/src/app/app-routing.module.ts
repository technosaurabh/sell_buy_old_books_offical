import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [

 
    

    {
      path: 'user',
      component : LayoutComponent,
      children : [{
        path : '',
        loadChildren : () => import('./shared/user-routes/user-routes.module').then(
          (m) => m.UserRoutesModule
        ),
      }]
    },

    {path : '',  loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule)
    },
  

    {
      path: 'management',
      component : LayoutComponent,
      children : [{
        path : '',
        loadChildren : () => import('./components/components/components.module').then(
          (m) => m.ComponentsModule
        ),
      }]
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
