import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addgasto',
  templateUrl: './addgasto.component.html',
  styleUrls: ['./addgasto.component.css']
})
export class AddgastoComponent implements OnInit {


  termino: any;
  public migrupo1: any;
  producto : any;

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.migrupo1 = this.crearMiFormulario();
  }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        this.termino = params['id'];
      });
  }

  crearMiFormulario() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
      costo: new FormControl('', [Validators.required]),
      descripcion: new FormControl(''),
    });
  }

  onResetForm(): void {
    this.migrupo1.reset();
  }
  crear(nombre: any, costo: any, descripcion: any){
    let gastooinversion = {
      gas_tip : this.termino,
      gas_nom : nombre.value,
      gas_val : costo.value,
      gas_fech : new Date(),
      gas_des : descripcion.value ? descripcion.value : 'sin descripcion'
    }
    this.productService.agregar('gastooinversion', gastooinversion).subscribe(res =>{
      if(this.termino == 1){
        this.router.navigate(['/gasto'])
      }else{
        this.router.navigate(['/inversion'])
      }
    });
  }

  get nombre() { return this.migrupo1.get('nombre'); }
  get costo() { return this.migrupo1.get('costo'); }
  get descripcion() { return this.migrupo1.get('descripcion'); }

}
