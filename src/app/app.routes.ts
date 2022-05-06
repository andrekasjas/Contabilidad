import { AdministradoresComponent } from './components/administradores/administradores.component';
import { ProductComponent } from './components/product/product.component';
import { EditgastoComponent } from './components/editgasto/editgasto.component';
import { AddgastoComponent } from './components/addgasto/addgasto.component';
import { InversionComponent } from './components/inversion/inversion.component';
import { GastoComponent } from './components/gasto/gasto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { AgotadoComponent } from './components/agotado/agotado.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { SearcherComponent } from './components/searcher/searcher.component';


const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'agotado', component: AgotadoComponent },
    { path: 'edit/:id', component: EditproductComponent },
    { path: 'search/:termino', component: SearcherComponent },
    { path: 'create', component: AddproductComponent },
    { path: 'addgastooinversion/:id', component: AddgastoComponent },
    { path: 'gasto', component: GastoComponent },
    { path: 'inversion', component: InversionComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'editgastooinversion/:id', component: EditgastoComponent},
    { path: 'administradores', component: AdministradoresComponent},
    { path: '**', component: HomeComponent },
];

export const APP_ROUTING = RouterModule.forRoot(ROUTES);
