import { CarritoService } from './../../services/carrito.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ifoto, ProductService } from '../../services/products.service';


@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  products: any [] = [];
  termino: any;
  fotos: any;
  foto: any[] = [];
  hayfoto: string[] = [];

  constructor(private carritoservice:CarritoService, private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let c = 0
      this.productService.getUsers('fotos').subscribe(res => {
        this.fotos = (<Ifoto>res);
        for(const foto of this.fotos){
          this.foto[c] = foto
          c++
        }
      })
      this.activatedRoute.params.subscribe(params => {
        this.termino = params['termino'];
        this.products = this.productService.searchProducts(params['termino']);
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
}
