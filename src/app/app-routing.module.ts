import { UserComponent } from './user/user.component';
import { VendorComponent } from './vendor/vendor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./user/user.module').then(mod=>mod.UserModule)},
  {path:'vendor',loadChildren:()=>import('./vendor/vendor.module').then(mod=>mod.VendorModule)},
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then(mod=>mod.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
