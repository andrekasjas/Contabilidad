import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: any[] = [];
  private eliminados: any[] = [];
  private cc : number = 0;
  private tam : number = 0;
  private total: number = 0;
  private totalgan: number = 0;
  private mostrara: boolean = false;

  constructor() {}

  mostrar(){
    this.mostrara = !this.mostrara
  }

  getcarrito(){
    return this.carrito
  }
  getTotal(){
    return {total: this.total, totalgan: this.totalgan, tam: this.tam, mostra: this.mostrara}
  }
  carro(id: string, nom: any, valc: number, valv: number, gan: number, cant: number){
    this.total = this.total + valv
    this.totalgan = this.totalgan + gan
    this.tam = this.tam + 1
    const i = this.esta(id);
    if(i >= 0){
      this.aumentar(id,valv,gan);
    }else{
      this.carrito[this.cc] = {
        ven_val: valv,
        ven_cant: 1,
        ven_tot: valv ,
        ven_fech: new Date(),
        ven_gan: gan,
        ven_pro_id: id,
        pro_nom : nom,
        pro_valc : valc,
        pro_valv : valv,
        pro_gan : gan,
        pro_cant : cant - 1,
        i: this.cc
      }
      this.cc++
    }
  }

  aumentar(id: string, valv : number, gan: number){
    this.total = this.total + valv
    this.totalgan = this.totalgan + gan
    this.tam = this.tam + 1
    const i = this.esta(id);
      if(this.carrito[i].pro_cant == 1){
        alert('Al realizar la venta su producto quedara agotado, agreguelo nuevamente desde la celda agotados')
      }
      this.carrito[i].ven_cant = this.carrito[i].ven_cant + 1
      this.carrito[i].ven_tot = valv * (this.carrito[i].ven_cant)
      this.carrito[i].ven_gan = this.carrito[i].ven_gan + gan
      this.carrito[i].pro_cant = this.carrito[i].pro_cant - 1
  }

  disminuir(id: string, valv : number, gan: number){
    this.total = this.total - valv
    this.totalgan = this.totalgan - gan
    this.tam = this.tam - 1
    const i = this.esta(id);
      this.carrito[i].ven_cant = this.carrito[i].ven_cant - 1
      this.carrito[i].ven_tot = valv * (this.carrito[i].ven_cant)
      this.carrito[i].ven_gan = this.carrito[i].ven_gan - gan
      this.carrito[i].pro_cant = this.carrito[i].pro_cant + 1
  }

  deletecarrito(id: string){
    const i = this.esta(id);
    const k = this.carrito.splice(i, 1);
    this.eliminados[i] = k
    this.total = this.total - k[0].ven_tot
    this.totalgan = this.totalgan - k[0].ven_gan
    this.cc --
    this.tam -= k[0].ven_cant
  }
  esta(idx: string){
    const i = this.carrito.findIndex(res => res.ven_pro_id == idx)
    return i
  }
  vaciar(){
    this.carrito = [];
    this.total = 0;
    this.totalgan = 0;
    this.cc = 0;
    this.tam = 0;
  }
}
