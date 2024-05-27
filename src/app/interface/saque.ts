export interface Saque {
    code:    number;
    message: string;
    data:    Datum[];
}

export interface Datum {
    id_saque:   number;
    type_saque: string;
}
