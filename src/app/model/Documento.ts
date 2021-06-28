import { TipoDocumento } from './TipoDocumento';

export class Documento {
    constructor(
        public codigo: number,
        public numero: string,
        public tipo: TipoDocumento,
        public blacklist: boolean
    ) { }
}
