import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './common/error-page/error-page.component';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./user/user.module').then(mod=>mod.UserModule)},
  {path:'vendor',loadChildren:()=>import('./vendor/vendor.module').then(mod=>mod.VendorModule)},
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then(mod=>mod.AdminModule)},
  {path: '404', component: ErrorPageComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
