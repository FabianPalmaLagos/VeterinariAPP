export interface UserCredential {
  email: string;
  password: string;
  uid: string;
}

export interface Citas{
idDueno: string;
nombreMascota: string;
fechaCita: Date;
horaCita: Date;
estado: string;
}

export interface Mascotas{
  idMascota: string;
  idDueno: string;
  nombreMascota: string;
  tipoMascota: string;
  pesoMascota: string;
  tipoEdad: string;
  edadMascota: number;
  estado: string;
  }

export interface UserProfile {
  uid: string;
  nombre: string;
  apellido: string
  email: string;
  calle: string;
  nCalle: number;
  comuna: string;
  ciudad: string;
  fono: string;
}
