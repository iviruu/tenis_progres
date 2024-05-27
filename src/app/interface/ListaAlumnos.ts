export interface ListaAlumnos {
    code:    number;
    message: string;
    data:    Datum[];
}

export interface Datum {
    alumno_id:       number;
    teacher_id:      number;
    estado_relacion: number;
    created_at:      Date;
    updated_at:      Date;
    Alumno:          Alumno;
}

export interface Alumno {
    name:    string;
    surname: null | string;
}
