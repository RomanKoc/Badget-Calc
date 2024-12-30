import { Injectable, signal } from '@angular/core';
import { Apartado, Extra, Seccion } from '../interfaces/budget';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  apartados    = signal<(Seccion | Apartado)[]>([]);

  nombre       = signal<string>('Nombre presupuesto');
  monedas      = signal<string[]>(['EUR', 'USD']);
  moneda_selet = signal<string>('EUR');
  descuentoApp = signal<number>(0);
  ivaApp       = signal<number>(0);
  sub_total    = signal<number>(0);
  
  new_serv     = signal<Apartado>({ id: 0, descripcion: 'Nuevo servicio', precio: 0, cantidad: 0 });
  new_sect     = signal<Seccion>({ id: 0, descripcion: 'Nueva seccion' });

  descuento    = signal<Extra>({ aplicado: false, valor:10});
  iva          = signal<Extra>({ aplicado: false, valor:21});

  constructor() { }

  setApartados(value: (Seccion | Apartado)[]) {
    this.apartados.set(value);
  }

  setNombre(value: string) {
    this.nombre.set(value);
  }

  setMonedas(value: string[]) {
    this.monedas.set(value);
  }

  setMonedaSelet(value: string) {
    this.moneda_selet.set(value);
  }

  updateDescuentoApp(value: number) {
    this.descuentoApp.set(value);
  }

  updateIvaApp(value: number) {
    this.ivaApp.set(value);
  }

  setSubTotal(value: number) {
    this.sub_total.set(value);
  }
  setNewServ(value: Apartado) {
    this.new_serv.set(value);
  }

  setNewSect(value: Seccion) {
    this.new_sect.set(value);
  }

  setDescuento(descuento: Extra) {
    this.descuento.set(descuento);
  }

  setIva(iva: Extra) {
    this.iva.set(iva);
  }

  updateDescuento(value: number) {
    this.descuento.update(descuento => ({ ...descuento, valor: value }));
  }

  updateIva(value: number) {
    this.iva.update(iva => ({ ...iva, valor: value }));
  }

  agregarSeccion():void{
    this.apartados.update(apartados => [...apartados, this.new_sect()]);
    this.new_sect.set({ id: this.apartados().length, descripcion: 'Nueva seccion' });
    this.new_serv.set({ id: this.apartados().length, descripcion: 'Nuevo servicio', precio: 0, cantidad: 0 });
  }

  agregarServicio():void{
    this.apartados.update((apartados) => [...apartados, this.new_serv()]);
    this.new_sect.set({ id: this.apartados().length, descripcion: 'Nueva seccion' });
    this.new_serv.set({ id: this.apartados().length, descripcion: 'Nuevo servicio', precio: 0, cantidad: 0 });
  }

  borrarApartado(id: number): void {
    this.apartados.update((apartados) => apartados.filter((apartado, index) => apartado !== null && index !== id));
    this.reorderId();
  }

  reorderId(): void {
    this.apartados.update((apartados) => apartados.filter(apartado => apartado !== null).map((apartado, index) => {
      apartado.id = index;
      return apartado;
    }));
  }

  aplicarDescuento():void{
    this.descuento.update((descuento) => ({ ...descuento, aplicado: !descuento.aplicado }));
  }
  aplicarIva():void{
    this.iva.update((iva) => ({ ...iva, aplicado: !iva.aplicado }));
  }

  subtotal(){
    return this.apartados().reduce((total, apartado) => {
      if (apartado && 'precio' in apartado && 'cantidad' in apartado) {
        return total + apartado.precio * apartado.cantidad;
      }
      return total;
    }, 0);
  };

  descuentoApplicado() {
    return (this.subtotal() * this.descuento().valor) / 100;
  };

  ivaApplicado(){
    return (this.subtotal() * this.iva().valor) / 100;
  };

  totalFinal(){
    let total = this.subtotal();
    if (this.descuento().aplicado) total -= this.descuentoApplicado();
    if (this.iva().aplicado)       total += this.ivaApplicado();

    return total;
  };

  isApartado(apartado: Seccion | Apartado): apartado is Apartado {
    return apartado !== null && 'precio' in apartado;
  }
    
  obternerDeStorage() {
    const storage = localStorage.getItem('budget-data');
    if (storage) {
      const data = JSON.parse(storage);
      this.setNombre(data.nombre);
      this.setMonedas(data.monedas);
      this.setApartados(data.apartados);
      this.setMonedaSelet(data.moneda_selet);
      this.updateDescuentoApp(data.descuentoApp);
      this.updateIvaApp(data.ivaApp);
      this.setSubTotal(data.sub_total);
      this.setNewServ(data.new_serv);
      this.setNewSect(data.new_sect);
      this.setDescuento(data.descuento);
      this.setIva(data.iva);
      return true;
    }
    return false;
  }

  guardarEnStorage(): void {
    const data = {
      apartados: this.apartados(),
      nombre: this.nombre(),
      monedas: this.monedas(),
      moneda_selet: this.moneda_selet(),
      descuentoApp: this.descuentoApp(),
      ivaApp: this.ivaApp(),
      sub_total: this.sub_total(),
      new_serv: this.new_serv(),
      new_sect: this.new_sect(),
      descuento: this.descuento(),
      iva: this.iva()
    };
    localStorage.setItem('budget-data', JSON.stringify(data));
  }

}
