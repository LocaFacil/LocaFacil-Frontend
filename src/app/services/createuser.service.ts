import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { CreateCompany, CreateUser, UpdateUser } from '../models/createUser';

@Injectable({
  providedIn: 'root'
})
export class CreateuserService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<UpdateUser> {
    return this.http.get<UpdateUser>(`${API_CONFIG.baseUrl}/user/${id}`);
  }


  create(cliente: CreateUser): Observable<CreateUser> {
    return this.http.post<CreateUser>(`${API_CONFIG.baseUrl}/user/createuser`, cliente);
  }

  createCompany(empresa: CreateCompany): Observable<CreateCompany> {
    return this.http.post<CreateCompany>(`${API_CONFIG.baseUrl}/company/createcompany`, empresa)
  }

  update(cliente: UpdateUser): Observable<UpdateUser> {
    return this.http.put<UpdateUser>(`${API_CONFIG.baseUrl}/user/${cliente.id}`, cliente);
  }
}
