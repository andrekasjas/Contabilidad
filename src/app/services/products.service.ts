
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private httpClient: HttpClient){}

    getUsers(text: string){
      return this.httpClient.get(`https://apicontabilidad.herokuapp.com/${text}`);
    }
    getUser(text: string, id: number){
      return this.httpClient.get(`https://apicontabilidad.herokuapp.com/${text}/${id}`);
    }
    agregar(text: string, form: any){
      return this.httpClient.post(`https://apicontabilidad.herokuapp.com/${text}`,form);
    }
    editUser(text: string ,idx: number, form: any){
      return this.httpClient.put(`https://apicontabilidad.herokuapp.com/${text}/${idx}`,form);
    }
    deleteUser(text: string ,idx: number){
      return this.httpClient.delete(`https://apicontabilidad.herokuapp.com/${text}/${idx}`);
    }

    createfoto(idx: any, foto: File){
      const fd = new FormData();
      fd.append('image', foto);
      fd.append('ima_pro_id', idx);
      return this.httpClient.post('https://apicontabilidad.herokuapp.com/foto', fd)
    }


     searchProducts ( termino: string){
        let resc: Iproducto[]=[];
        let productos: any;
        termino = termino.toLowerCase();
        this.getUsers('productos').forEach(res=>{
            productos=(<Iproducto>res);
            for(const producto of productos){
                const name = producto.pro_nom.toLowerCase();
                if(name.indexOf(termino) >= 0){
                  resc.push(producto)
                }
            }
        })
        return resc;
      }
}



export interface Iproducto{
    pro_nom: string,
    pro_valc: number,
    pro_valv: number,
    pro_gan: number,
    pro_cant: number
  }
  export interface Iventa{
    ven_val: number,
    ven_cant: number,
    ven_tot: number,
    ven_fech: Date,
    ven_gas: number,
    ven_gan: number,
    ven_pro_id: number
  }
  export interface Igasto{
    gas_fech: Date,
    gas_nom: string,
    gas_tip: number,
    gas_val: number,
    gas_des: string
  }
  export interface Ifoto{
    ima_path: string;
    ima_pro_id: number;
  }
