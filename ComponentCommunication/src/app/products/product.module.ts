//import { AuthGuard } from './../user/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductResolver } from './product-resolver.service';
import { ProductEditGuard } from './product-edit/product-edit.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { ProductShellComponent } from './product-shell/product-shell.component';
import { ProductShellListComponent } from './product-shell/product-shell-list.component';
import { ProductShellDetailComponent } from './product-shell/product-shell-detail.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    //InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    RouterModule.forChild([
      {
        path: '',
        component: ProductShellComponent,
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        resolve: { resolvedData: ProductResolver },
      },
      {
        path: ':id/edit',
        canDeactivate: [ProductEditGuard],
        component: ProductEditComponent,
        resolve: {
          resolvedData: ProductResolver,
        },
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: ProductEditInfoComponent },
          { path: 'tags', component: ProductEditTagsComponent },
        ],
      },
    ]),
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent,
    ProductShellComponent,
    ProductShellListComponent,
    ProductShellDetailComponent
  ],
})
export class ProductModule {}
