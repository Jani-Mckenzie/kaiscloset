import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './components/auth/auth.module'


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemDetailsComponent } from './components/items/item-details/item-details.component';

import { HeaderComponent } from './components/header/header.component';
import { ItemFilterComponent } from './components/items/item-filter/item-filter.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthComponent } from './components/auth/auth.component';

import { AdduserComponent } from './components/adduser/adduser.component';
import { CartComponent } from './components/cart/cart.component';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { AdditemComponent } from './components/additem/additem.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemsComponent,
    ItemDetailsComponent,
    HeaderComponent,
    ItemFilterComponent,
    FooterComponent,
    AuthComponent,
    AdduserComponent,
    CartComponent,
    AdditemComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule,
    FormsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
