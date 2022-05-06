import { ProductService, Igasto } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inversion',
  templateUrl: './inversion.component.html',
  styleUrls: ['./inversion.component.css']
})
export class InversionComponent implements OnInit {

  invversiones: any;
  inversiones : any[] = [];
  total : number = 0;

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    let cc = 0
    this._productService.getUsers('gastosoinversion').forEach(res=>{
      this.invversiones=(<Igasto>res);
      for(const inversion of this.invversiones){
        if(inversion.gas_tip == 2){
          this.inversiones[cc] = inversion
          cc++
          this.total += inversion.gas_val
        }
      }
    });
  }

  eliminar(idx:number){
    this._productService.deleteUser('gastooinversion',idx).forEach(res=>{window.location.reload();});
  }
}
