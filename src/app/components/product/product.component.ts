import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Iproducto } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any= [];
  id: number = 0;
  cantidad: number = 1;
  public migrupo1: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _productService: ProductService ) {
    this.migrupo1 = this.crearMiFormulario();
    this.activatedRoute.params.subscribe( params=>{
      this.id = params['id'];
    });
  }
  ngOnInit(): void {
    this._productService.getUser('producto', this.id).forEach(res=>{
      this.products=(<Iproducto>res);
    });
  }

  aumentar(cant: number){
    if(cant > this.cantidad)
      this.cantidad = this.cantidad + 1
    if(cant == this.cantidad)
     alert('Al realizar la venta su producto quedara agotado, agreguelo nuevamente desde la celda agotados');

  }
  disminuir(){
    if(this.cantidad > 1 )
    this.cantidad = this.cantidad - 1
  }
  agregarventa(id: number, nom: any, valc: number, valv: number, gas: number, gan: number, cant: number){
    let venta = {
      ven_val: valv,
      ven_cant: this.cantidad,
      ven_tot: valv * this.cantidad,
      ven_fech: new Date(),
      ven_gas: gas ? gas : 0,
      ven_gan: (gan * this.cantidad)-gas,
      ven_pro_id: id
    }
    let producto = {
      pro_nom : nom,
      pro_valc : valc,
      pro_valv : valv,
      pro_gan : gan,
      pro_cant : cant - this.cantidad
    }
    this._productService.agregar('venta',venta).subscribe(res =>
      this._productService.editUser('producto', id, producto).subscribe(resq =>
        this.router.navigate(['/'])
      )
    );

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



