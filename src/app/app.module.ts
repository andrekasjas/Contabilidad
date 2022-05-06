import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { AgotadoComponent } from './components/agotado/agotado.component';
import { HomeComponent } from './components/home/home.component';
import { APP_ROUTING } from './app.routes';
import {ProductService } from '../app/services/products.service';
import { ProductComponent } from './components/product/product.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { HttpClientModule } from '@angular/common/http';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditproductComponent } from './components/editproduct/editproduct.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { GastoComponent } from './components/gasto/gasto.component';
import { InversionComponent } from './components/inversion/inversion.component';
import { AddgastoComponent } from './components/addgasto/addgasto.component';
import { EditgastoComponent } from './components/editgasto/editgasto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdministradoresComponent } from './components/administradores/administradores.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    AgotadoComponent,
    HomeComponent,
    ProductComponent,
    SearcherComponent,
    AddproductComponent,
    EditproductComponent,
    CarritoComponent,
    GastoComponent,
    InversionComponent,
    AddgastoComponent,
    EditgastoComponent,
    AdministradoresComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
