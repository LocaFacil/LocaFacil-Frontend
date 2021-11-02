import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { dumpsterList } from '../models/cliente';
import { CreateCompany, CreateDumpster, CreateUser, UpdateCompany, UpdateUser, UserInfo } from '../models/createUser';

@Injectable({
  providedIn: 'root'
})
export class CreateuserService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<UpdateUser> {
    return this.http.get<UpdateUser>(`${API_CONFIG.baseUrl}/user/${id}`);
  }

  findByIdClient(id: any): Observable<UserInfo> {
    debugger;
    return this.http.get<UserInfo>(`${API_CONFIG.baseUrl}/user/${id}`);
  }

  findByIdInfo(id: any): Observable<CreateUser> {
    return this.http.get<CreateUser>(`${API_CONFIG.baseUrl}/user/check/${id}`);
  }

  findByIdDumpster(id: any): Observable<CreateDumpster> {
    return this.http.get<CreateDumpster>(`${API_CONFIG.baseUrl}/dumpster/${id}`);
  }

  findByIdCompany(id: any): Observable<UpdateCompany> {
    return this.http.get<UpdateCompany>(`${API_CONFIG.baseUrl}/company/${id}`);
  }

  findAll(id: any): Observable <dumpsterList[]> {
    return this.http.get<dumpsterList[]>(`${API_CONFIG.baseUrl}/dumpster/filter?company_id=${id}`);
  }

  create(cliente: CreateUser): Observable<CreateUser> {
    return this.http.post<CreateUser>(`${API_CONFIG.baseUrl}/user/createuser`, cliente);
  }


  createCompany(empresa: CreateCompany): Observable<CreateCompany> {
    return this.http.post<CreateCompany>(`${API_CONFIG.baseUrl}/company/createcompany`, empresa)
  }

  createDumpster(dumpster: CreateDumpster): Observable<CreateDumpster> {
    return this.http.post<CreateDumpster>(`${API_CONFIG.baseUrl}/dumpster/create`, dumpster)
  }

  update(cliente: UpdateUser): Observable<UpdateUser> {
    return this.http.put<UpdateUser>(`${API_CONFIG.baseUrl}/user/${cliente.id}`, cliente);
  }

  updateInfoClient(clienteInfo: UserInfo): Observable<UserInfo> {
    debugger;
    return this.http.put<UserInfo>(`${API_CONFIG.baseUrl}/user/${clienteInfo.id}`, clienteInfo);
  }


  updateCompany(company: UpdateCompany): Observable<UpdateCompany> { 
    return this.http.put<UpdateCompany>(`${API_CONFIG.baseUrl}/company/${company.id}`, company);
  }

  delete(id: any): Observable<CreateDumpster> {
    return this.http.delete<CreateDumpster>(`${API_CONFIG.baseUrl}/dumpster/${id}`);
  }


}
