import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from './../../services/products.service';
import { CarritoService } from './../../services/carrito.service';
import { Component, OnInit } from '@angular/core';
interface Ievent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito: any[] = [];
  total: number = 0;
  totalgan: number = 0;
  migrupo1: any;
  tam : number = 0;
  mostrar : boolean = false;
  administradores: any;
  administradorFormulario: any;
  administrador: number = 1;

  constructor(private carritoservice : CarritoService, private _productService: ProductService, private router: Router) {
    this.migrupo1 = this.crearMiFormulario();

    this.administradorFormulario = new FormGroup({administrador: new FormControl(null),nuevo: new FormControl('', [Validators.required])});
    this.administradorFormulario.controls['administrador'].setValue(this.administrador, {onlySelf: true});
  }

  ngOnInit() {
    this.carrito = this.carritoservice.getcarrito()
    this.reload()
    this._productService.getUsers('administradores').subscribe(res =>{
      this.administradores = res
    });
  }

  a(){
    this.administrador = this.administradorFormulario.get('administrador').value ;
  }

  reload(){
    this.carrito = this.carritoservice.getcarrito()
    this.total = this.carritoservice.getTotal().total
    this.totalgan = this.carritoservice.getTotal().totalgan
    this.tam = this.carritoservice.getTotal().tam
    this.mostrar = this.carritoservice.getTotal().mostra
    return true
  }

  deletecarrito(id : string){
    this.carritoservice.deletecarrito(id);
  }

  vaciar(){
    this.reset();
    this.onResetForm();
    this.carritoservice.vaciar();
  }
  aumentar(id: string, valv : number, gan: number){
    this.carritoservice.aumentar(id,valv,gan)
  }
  disminuir(id: string, valv : number, gan: number){
    this.carritoservice.disminuir(id,valv,gan)
  }

  enviar(){
      if(this.administrador == -1){
        let admin = {
          adm_nom : this.administradorFormulario.get('nuevo').value,
          adm_val : 0
        }
        this._productService.agregar('administrador', admin).subscribe((req:any) =>
          this._productService.getUsers('administradores').subscribe((rek:any)=>{
            for(const admi of rek){
              if(admi.adm_nom == (this.administradorFormulario.get('nuevo').value)){
                this.administrador = admi.adm_id;
                this.agrega();
              }
            }
          })
        )
      }else{
        this.agrega();
      }
  }

  agrega(){
    const descuentopo = ((this.migrupo1.get('descuento').value) * 100)/ this.total
    for(const carro of this.carrito){
    let venta = {
      ven_val: carro.ven_val,
      ven_cant: carro.ven_cant,
      ven_tot: carro.ven_tot,
      ven_fech: carro.ven_fech,
      ven_gas: this.migrupo1.get('descuento').value ? Math.round(carro.ven_tot * (descuentopo / 100)): 0,
      ven_gan: this.migrupo1.get('descuento').value ? Math.round(carro.ven_gan - (carro.ven_tot * (descuentopo / 100))) : carro.ven_gan,
      ven_pro_id: carro.ven_pro_id,
      ven_adm_id: this.administrador
    }

    let producto = {
      pro_nom : carro.pro_nom,
      pro_valc : carro.pro_valc,
      pro_valv : carro.pro_valv,
      pro_gan : carro.pro_gan,
      pro_cant : carro.pro_cant
    }
    let administrador = {
      adm_val : this.total
    }
    this._productService.agregar('venta',venta).subscribe(res =>
         this._productService.editUser('producto', carro.ven_pro_id, producto).subscribe(resq =>
           this._productService.editUser('administrador', this.administrador, administrador).subscribe(req => {
             this.vaciar()
             this.router.navigate([''])
           })
       )
     );
          }
  }

  crearMiFormulario() {
    return new FormGroup({
      descuento: new FormControl('', [Validators.required]),
    });
  }

  onResetForm(): void {
    this.migrupo1.reset();
  }

  reset(){
    this.administrador = 1
    this.administradorFormulario.reset();
  }

  get descuento() { return this.migrupo1.get('descuento'); }
  get nuevo() { return this.administradorFormulario.get('nuevo'); }


}
