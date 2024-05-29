export interface ListaAlumnos {
    code:    number;
    message: string;
    data:    DatumListaAlumnos[];
}

export interface DatumListaAlumnos {
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
