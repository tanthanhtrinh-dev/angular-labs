import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './accounts/account/account.component';
import { CustomerComponent } from './customers/customer.component';

const routes: Routes = [
  { path: 'customer', component: CustomerComponent },
  { path: 'account', component: AccountComponent },
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  { path: '**', redirectTo: 'customer', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
