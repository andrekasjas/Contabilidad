import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, Igasto } from './../../services/products.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editgasto',
  templateUrl: './editgasto.component.html',
  styleUrls: ['./editgasto.component.css']
})
export class EditgastoComponent implements OnInit {

  termino: any;
  public migrupo1: any;
  gastos: any;
  gasttos: any;

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( params=>{
      this.termino = params['id'];
    });
  }

  ngOnInit(): void {
    this.migrupo1 = this.crearMiFormulario(1);
    this.productService.getUser('gastooinversion', this.termino).forEach(res=>{
      this.gastos=(<Igasto>res);
      for(const gasto of this.gastos){
        this.gasttos = {
          nom: gasto.gas_nom,
          cos: gasto.gas_val,
          des: gasto.gas_des,
          tip: gasto.gas_tip
        }
      }
      this.migrupo1 = this.crearMiFormulario(this.gasttos);
    });
  }

  crearMiFormulario(json: any) {
    return new FormGroup({
      nombre: new FormControl(json.nom, [Validators.required, Validators.minLength(5)]),
      costo: new FormControl(json.cos, [Validators.required]),
      descripcion: new FormControl(json.des),
    });
  }

  onResetForm(): void {
    this.migrupo1.reset();
  }
  editar(nombre: any, costo: any, descripcion: any){
    let gastooinversion = {
      gas_nom : nombre.value,
      gas_val : costo.value,
      gas_des : descripcion.value ? descripcion.value : 'sin descripcion'
    }
    this.productService.editUser('gastooinversion', this.termino, gastooinversion).subscribe(res =>{
      if(this.gasttos.tip == 1){
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
