/* export interface Users {
    users: User[];
}
 */
export interface User {
    nombre: string;
    apellidos: string;
    direccion: string;
    telefono: string;
    email: string,
    password: string,
    focos: Conectores[];
    conectores: Conectores[];
    focoConector: Conectores[];
}

export interface Conectores {
    id: number;
    nombreCuarto: string;
    switch: boolean;
    volts: number;
    voltsAcumulados: number
}
