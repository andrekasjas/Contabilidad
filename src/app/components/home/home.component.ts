import { ProductService, Iventa, Iproducto } from './../../services/products.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit{

  ventas:any[]=[];
  ventass:any;
  ganancia: number = 0;
  gastos: number = 0;
  nombre: string[] = [];
  costo: number[] = [];
  aa: any;
  totalventas: number = 0;

  constructor(private _productService: ProductService) { }

  // fecha = new Date().getUTCMonth()+1;
  ngAfterViewInit() {
    let cc = 0
    this._productService.getUsers('ventas').subscribe(res=>{
      this.ventass=(<Iventa>res);
      for(const venta of this.ventass){
          this._productService.getUser('producto',venta.ven_pro_id).subscribe(resq=>{
          this.aa=(<Iproducto>resq)
          for(const a of this.aa){
            this.ventas[cc]={
              ven_id: venta.ven_id,
              ven_fech: venta.ven_fech,
              ven_val: venta.ven_val,
              ven_cant: venta.ven_cant,
              ven_cos: a.pro_valc * venta.ven_cant,
              ven_tot: venta.ven_tot,
              ven_gas: venta.ven_gas,
              ven_gan: venta.ven_gan,
              pro_id: a.pro_id,
              pro_nom: a.pro_nom,
              ven_adm_id: venta.ven_adm_id
            }
            cc++
            if(this.ventass.length == cc){
              this.ordenar()
            }
          }
        })
        this.ganancia += venta.ven_gan
        this.gastos += venta.ven_gas
        this.totalventas += venta.ven_tot
      }
    });

  }

  ordenar(){
    this.ventas.sort((a, b) =>{
      return b.ven_id - a.ven_id
    });
  }
  ordenarganancia(){
    this.ventas.sort((a, b) =>{
      return b.ven_gan - a.ven_gan
    });
  }
  eliminar(idx:number){
    const i = this.ventas.findIndex(res => res.ven_id == idx);
    const idproducto = this.ventas[i].pro_id
        this._productService.getUser('producto', idproducto).forEach(resq =>{
          this.aa = (<Iproducto>resq)
          for(const producto of this.aa){
            let ven = {
              pro_nom : producto.pro_nom,
              pro_valc : producto.pro_valc,
              pro_valv : producto.pro_valv,
              pro_gan : producto.pro_gan,
              pro_cant : producto.pro_cant + this.ventas[i].ven_cant
            }
            let administrador = {
              adm_val : -this.ventas[i].ven_tot
            }
            this._productService.editUser('producto', producto.pro_id, ven).subscribe(resp =>
              this._productService.deleteUser('venta',idx).forEach(res=>{
                this._productService.editUser('administrador', this.ventas[i].ven_adm_id, administrador).subscribe(req => {
                  window.location.reload()
                })
              })
            )
          }
        })
  }

}
