import { AccountComponent } from './../accounts/account.component';
import { CustomerComponent } from './customer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: 'customer', component: CustomerComponent },
        { path: 'account', component: AccountComponent },
    ]
    ),
  ],
  declarations: [CustomerComponent, AccountComponent],
  exports: [ CommonModule, FormsModule],
})
export class CustomerModule {}
