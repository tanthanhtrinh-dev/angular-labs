import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customers/customer.component';
import { AccountComponent } from './accounts/account.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { CustomerModule } from './customers/customer.module';
import { HttpClientModule } from '@angular/common/http';
import { MessageModule } from './messages/message.module';
import { UserModule } from './user/user.module';
import { AuthGuard } from './user/auth.guard';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';
@NgModule({
  declarations: [
    AppComponent,
    //AccountComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    //FormsModule,
    //ReactiveFormsModule,
    CustomerModule,
    //ProductModule,
    MessageModule,
    UserModule,
    AppRoutingModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
