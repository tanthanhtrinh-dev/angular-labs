import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { SelectiveStrategy } from './selective-strategy.service';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'products',
    //canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { preload: false },
    loadChildren: () =>
      {
        console.log("loadChildren");
        return import('./products/product.module').then((m) => m.ProductModule);
      },
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },  
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,      
      { 
        preloadingStrategy: SelectiveStrategy, 
        //enableTracing: true, 
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
