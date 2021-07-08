import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './accounts/account.component';
import { CustomerComponent } from './customers/customer.component';


const routes: Routes = [
  { path: 'customer', component: CustomerComponent },
  { path: 'account', component: AccountComponent },    
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  { path: '**', redirectTo: 'account', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
