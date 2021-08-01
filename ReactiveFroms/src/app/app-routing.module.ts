import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './accounts/account.component';
import { CustomerComponent } from './customers/customer.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { SelectiveStrategy } from './selective-strategy.service';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
  { path: 'customer', component: CustomerComponent },
  { path: 'account', component: AccountComponent },
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  { path: '**', redirectTo: 'account', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'welcome', component: WelcomeComponent },
    { path: 'products', 
      //canActivate: [AuthGuard],
      canLoad: [AuthGuard],
      data: {preload: false},
      loadChildren: ()=>import('./products/product.module').then(m=>m.ProductModule)
    },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
  ], 
  //{ enableTracing: true }
  //{ preloadingStrategy: PreloadAllModules }   
  { preloadingStrategy: SelectiveStrategy }   //Custom preloading strategy
  // , { enableTracing: true, preloadingStrategy: SelectiveStrategy }
  )],
  exports: [RouterModule],
})
export class AppRoutingModule {}
