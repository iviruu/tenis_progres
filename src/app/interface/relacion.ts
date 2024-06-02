export interface relacion {   
    alumno_id: number;
    teacher_id: number;
    estado_relacion: number;
    relacion_id: number;
}
export interface TodaLista {
    code:    number;
    message: string;
    data:    todaListaAlumnos[];
}

export interface todaListaAlumnos {
    id:      number;
    name:    string;
    surname: null | string;
    email:   string;
}

export interface RelacionAlumno {
    code:    number;
    message: string;
    data:    DataRelacionAlumno;
}

export interface DataRelacionAlumno {
    alumno_id:       number;
    teacher_id:      number;
    estado_relacion: number;
    relacion_id:     number;
    created_at:      Date;
    updated_at:      Date;
    Teacher:         Teacher;
}

export interface Teacher {
    name:    string;
    surname: string;
}
