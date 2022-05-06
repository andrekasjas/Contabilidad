import { ProductService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})
export class AdministradoresComponent implements OnInit {

  administradores : any;
  total : number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getUsers('administradores').subscribe(res =>{
      this.administradores = res
      for(const administrador of this.administradores){
        this.total += administrador.adm_val
      }
    })
  }

}
