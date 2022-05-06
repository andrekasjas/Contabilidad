import { CarritoService } from './../../services/carrito.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  migrupo1: any;

tam = 0
  constructor(private router: Router, private carritoservice: CarritoService) {
    this.migrupo1 = this.crearMiFormulario();
  }

  ngOnInit(): void {

  }

  mostrar(){
    this.carritoservice.mostrar()
  }

  tamano(){
    this.tam = this.carritoservice.getTotal().tam
  }

  searchProduct( termino: string){
    this.router.navigate(['/search',termino]);
  }

  crearMiFormulario() {
    return new FormGroup({
      search: new FormControl('', [Validators.required]),
    });
  }

  onResetForm(): void {
    this.migrupo1.reset();
  }

  get search() { return this.migrupo1.get('search'); }

}
