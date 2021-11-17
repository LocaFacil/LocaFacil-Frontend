export interface CreateUser {
    iduser: any;
    name: string;
    email: string;
    password: string;
}

export interface UserInfo {
    id?: any;
    name?: any;
    email?: any;
    password?: any;
    cpf: any;
    phone: any;
    address: any;
    addressnum?: any;
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
    email: string;
    password: string;
}

export interface UpdateCompany {
    id: any;
    name: string;
    email: string;
    phone: string;
    cnpj: string;
    password: string;
}


export interface CreateDumpster {
    id: any,
    size: any,
    price: string,
    typetrash?: any,
    status?: any;
    statusid?: any;
}

export interface Solicitacao {
    id?: any;
    size: any;
    address: any;
    addressnum: any;
    typetrash: any;
    dateinit: any;
    datefinal:any;
}