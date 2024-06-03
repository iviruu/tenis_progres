export interface ListaPendiente {
    code:    number;
    message: string;
    data:    DataListaPendiente[];
}

export interface DataListaPendiente {
    alumno_id:       number;
    teacher_id:      number;
    estado_relacion: number;
    relacion_id:     number;
    created_at:      Date;
    updated_at:      Date;
    Alumno:          Alumno;
}

export interface Alumno {
    name:    string;
    surname: string;
}
