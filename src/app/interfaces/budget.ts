export interface Budget{
  nombre:     string;
  monedas:    string[];
  apartados: (Seccion | Apartado)[];
  descuento:  Extra;
  iva:        Extra;
  sub_total:  number;
}

export interface Seccion{
  id:          number;
  descripcion: string;
}
export interface Apartado {
  id:          number;
  descripcion: string;
  precio:      number;
  cantidad:    number;
}
export interface Extra {
  aplicado: boolean;
  valor:    number;
}