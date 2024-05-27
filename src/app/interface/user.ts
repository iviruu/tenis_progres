
export interface User {
    code:    number;
    message: string;
    data:    Data;
}

export interface Data {
    id_user:    number;
    email:      string;
    name:       string;
    surname:    string;
    photo:      null;
    roles:      number;
    created_at: Date;
    updated_at: Date;
}

