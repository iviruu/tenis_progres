export interface Resultados {
    code:    number;
    message: string;
    data:    DatumResultados[];
}

export interface DatumResultados {
    id:         number;
    user_id:    number;
    saque_id:   number;
    velocidad:  string;
    punteria:   string;
    created_at: Date;
    updated_at: Date;
}
