export interface Resultados {
    code:    number;
    message: string;
    data:    Datum[];
}

export interface Datum {
    id:         number;
    user_id:    number;
    saque_id:   number;
    velocidad:  string;
    punteria:   string;
    created_at: Date;
    updated_at: Date;
}
