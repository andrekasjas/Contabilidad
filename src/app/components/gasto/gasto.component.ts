import { ProductService, Igasto } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.css']
})
export class GastoComponent implements OnInit {

  gasttos: any;
  gastos : any[] = [];
  total: number = 0;

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    let cc = 0
    this._productService.getUsers('gastosoinversion').forEach(res=>{
      this.gasttos=(<Igasto>res);
      for(const gasto of this.gasttos){
        if(gasto.gas_tip == 1){
          this.gastos[cc] = gasto
          cc++
          this.total += gasto.gas_val
        }
      }
    });
  }

  eliminar(idx:number){
    this._productService.deleteUser('gastooinversion',idx).forEach(res=>{window.location.reload();});
  }

}
