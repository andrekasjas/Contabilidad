import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService, Iproducto } from './../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  id: number = 0;
  products: any;
  producct: any;
  migrupo1: any;
  file:any;
  fot: any;
  fotos : string = 'assets/img/nofoto.png';

  constructor(private router:Router, private activatedRoute: ActivatedRoute, private _productService: ProductService) {
    this.activatedRoute.params.subscribe( params=>{
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.migrupo1 = this.crearMiFormulario(1);
    this._productService.getUser('producto', this.id).forEach(res=>{
      this.products=(<Iproducto>res);
      for(const product of this.products){
        this._productService.getUser('foto', product.pro_id).subscribe(req => {
          this.fot = req
          for(const fo of this.fot){
            this.fotos = 'https://apicontabilidad.herokuapp.com/'+ fo.ima_path
          }
        })
        this.producct = {
          nom: product.pro_nom,
          cos: product.pro_valc,
          val: product.pro_valv,
          cant: product.pro_cant
        }
      }
      this.migrupo1 = this.crearMiFormulario(this.producct);
    });
  }

  crearMiFormulario(json: any) {
    return new FormGroup({
      nombre: new FormControl(json.nom, [Validators.required, Validators.minLength(5)]),
      costo: new FormControl(json.cos, [Validators.required]),
      venta: new FormControl(json.val, [Validators.required]),
      cantidad: new FormControl(json.cant, [Validators.required]),
    });
  }

  onResetForm(): void {
    this.migrupo1.reset();
  }

  edit(nombre: any, costo: any, venta: any, cantidad: any){
    let producto = {
      pro_nom : nombre.value,
      pro_valc : costo.value,
      pro_valv : venta.value,
      pro_gan: venta.value - costo.value,
      pro_cant : cantidad.value
    }
    this._productService.editUser('producto', this.id, producto).subscribe(res =>{
      if(this.file){
        for(const fo of this.fot){
          this._productService.deleteUser('foto', fo.ima_id).subscribe(res => console.log(res))
        }
        this._productService.createfoto(this.id, this.file).subscribe(res => this.router.navigate(['/products']), err => console.log(err));
      }else{
        this.router.navigate(['/products'])
      }
    });

  }

  fotose(event: any): void{
    if(event.target.files && event.target.files[0]){
      this.file = <any>event.target.files[0];
    }
    const reader = new FileReader();
    reader.onload = e => this.fotos = reader.result as string
    reader.readAsDataURL(this.file)
  }

  get nombre() { return this.migrupo1.get('nombre'); }
  get costo() { return this.migrupo1.get('costo'); }
  get venta() { return this.migrupo1.get('venta'); }
  get cantidad() { return this.migrupo1.get('cantidad'); }


}
