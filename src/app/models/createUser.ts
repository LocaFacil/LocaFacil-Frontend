export interface CreateUser {
    iduser: any;
    name: string;
    email: string;
    password: string;
}

export interface CreateCompany {
    id: any;
    name: string;
    email: string;
    phone: string;
    cnpj: string;
    password: string;
}

export interface UpdateUser {
    id: any;
    name: string;
    cpf: string;
    email: string;
    phone: string;
    password: string;
    termsUse: string;
    profiles: [];
}