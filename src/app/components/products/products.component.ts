import { CarritoService } from './../../services/carrito.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ifoto, Iproducto } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productts: any;
  fotos: any;
  foto: any[] = [];
  products: any[] = [];
  hayfoto: string[] = [];
  eliminados: any[] = [];
  cc : number = 0;
  public migrupo1: any;
  tam: number = 0;

  constructor(private _productService: ProductService, private router: Router, private carritoservice : CarritoService) {
    this.migrupo1 = this.crearMiFormulario();
  }

  ngOnInit(): void {
      let cc = 0
      let c = 0
      this._productService.getUsers('fotos').subscribe(res => {
        this.fotos = (<Ifoto>res);
        for(const foto of this.fotos){
          this.foto[c] = foto
          c++
        }
      })
      this._productService.getUsers('productos').forEach(res=>{
        this.productts=(<Iproducto>res);
        for(const product of this.productts){
          if(product.pro_cant > 0){
            this.products[cc] = product
            cc++
          }
        }
        this.tam = this.products.length
      });
  }

  carro(id: string, nom: any, valc: number, valv: number, gan: number, cant: number){
    this.carritoservice.carro(id,nom,valc,valv,gan,cant);
  }

  esta(idx: string){
    const i = this.carritoservice.esta(idx);
    return i
  }


  vendio (idx:number){
    this.router.navigate(['/product', idx]);
  }

  edit(idx: number){
    this.router.navigate(['/edit', idx])
  }

  aparte(a: string, b:string, i: number){
    if(a == b){
      this.hayfoto[i] = a
      return true;
    }
    return false
  }
  noesta(a: string){
    for(const hay of this.hayfoto){
      if(hay == a){
        return false
      }
    }
    return true
  }

  vaciar(){
    this.onResetForm()
    this.carritoservice.vaciar()
  }

  crearMiFormulario() {
    return new FormGroup({
      descuento: new FormControl('', [Validators.required]),
    });
  }

  onResetForm(): void {
    this.migrupo1.reset();
  }

  get descuento() { return this.migrupo1.get('descuento'); }
}

