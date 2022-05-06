import { ProductService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

interface Ievent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  file: any;
  fotos: string = 'assets/img/nofoto.png';
  public migrupo1: any;
  producto : any;

  constructor(private _productService: ProductService, private router: Router) {
    this.migrupo1 = this.crearMiFormulario();
  }

  ngOnInit(): void {
  }


  crearMiFormulario() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
      costo: new FormControl('', [Validators.required]),
      venta: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
    });
  }

  onResetForm(): void {
    this.migrupo1.reset();
  }
  crear(nombre: any, costo: any, venta: any, cantidad: any){
    const id = uuidv4();
    let producto = {
      pro_id : id,
      pro_nom : nombre.value,
      pro_valc : costo.value,
      pro_valv : venta.value,
      pro_gan: venta.value - costo.value,
      pro_cant : cantidad.value
    }
    this._productService.agregar('producto', producto).subscribe(res =>{
      if(this.file){
        this._productService.createfoto(id, this.file).subscribe(res => this.router.navigate(['/products']), err => console.log(err));
      }else{
        this.router.navigate(['/products'])
      }
    }
    );
  }

  get nombre() { return this.migrupo1.get('nombre'); }
  get costo() { return this.migrupo1.get('costo'); }
  get venta() { return this.migrupo1.get('venta'); }
  get cantidad() { return this.migrupo1.get('cantidad'); }


  fotose(event: any): void{
    if(event.target.files && event.target.files[0]){
      this.file = <any>event.target.files[0];
    }
    const reader = new FileReader();
    reader.onload = e => this.fotos = reader.result as string
    reader.readAsDataURL(this.file)
  }
}
