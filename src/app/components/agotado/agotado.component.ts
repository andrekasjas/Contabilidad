import { Router } from '@angular/router';
import { Ifoto, Iproducto, ProductService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agotado',
  templateUrl: './agotado.component.html',
  styleUrls: ['./agotado.component.css']
})
export class AgotadoComponent implements OnInit {

  productts: any;
  products: any[] = [];
  fotos: any;
  foto: any[] = [];
  hayfoto: string[] = [];
  tam: number = 0;
  constructor(private _productService: ProductService, private router: Router) { }

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
          if(product.pro_cant <= 0){
            this.products[cc] = product
            cc++
          }
        }
        this.tam = this.products.length

      });

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

}
