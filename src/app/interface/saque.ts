export interface Saque {
    code:    number;
    message: string;
    data:    DatumSaque[];
}

export interface DatumSaque {
    id_saque:   number;
    type_saque: string;
}
