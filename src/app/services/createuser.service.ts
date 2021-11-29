import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { dumpsterList } from '../models/cliente';
import { ClientEntregar, ClientList, CreateCompany, CreateDumpster, CreateUser, Solicitacao, UpdateCompany, UpdateUser, UserInfo } from '../models/createUser';

@Injectable({
  providedIn: 'root'
})
export class CreateuserService {
  id: any;
  idTerms: any;

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<UpdateUser> {
    return this.http.get<UpdateUser>(`${API_CONFIG.baseUrl}/user/${id}`);
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

  livres(): Observable <dumpsterList[]> {
    
    return this.http.get<dumpsterList[]>(`${API_CONFIG.baseUrl}/dumpster/status/1`);
  }

  ocupados(): Observable <dumpsterList[]> {
    
    return this.http.get<dumpsterList[]>(`${API_CONFIG.baseUrl}/dumpster/status/2`);
  }

  findAllUser(id: any): Observable <ClientList[]> {
    return this.http.get<ClientList[]>(`${API_CONFIG.baseUrl}/request/all/${id}`);
  }

  findAllCompany(): Observable <ClientList[]> {
   
    return this.http.get<ClientList[]>(`${API_CONFIG.baseUrl}/request/lists`);
  }

  cacambasLivres(): Observable <ClientList[]> {
   
    return this.http.get<ClientList[]>(`${API_CONFIG.baseUrl}/dumpster/status/1`);
  }

  cacambasOcupada(): Observable <ClientList[]> {
   
    return this.http.get<ClientList[]>(`${API_CONFIG.baseUrl}/dumpster/status/2`);
  }
  
  findAllTermo(id: any): Observable <UserInfo> {
    return this.http.get<UserInfo>(`${API_CONFIG.baseUrl}/user/checktermsuse/${id}`);
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

  createSolicitacao(solicitacao: Solicitacao): Observable<Solicitacao> {
    
    return this.http.post<Solicitacao>(`${API_CONFIG.baseUrl}/request/create`, solicitacao)
  }

  updateDumpster(dumpster: CreateDumpster): Observable<CreateDumpster> {
    return this.http.put<CreateDumpster>(`${API_CONFIG.baseUrl}/dumpster/${dumpster.id}`, dumpster);
  }


  update(cliente: UpdateUser): Observable<UpdateUser> {
    return this.http.put<UpdateUser>(`${API_CONFIG.baseUrl}/user/${cliente.id}`, cliente);
  }

  updateInfoClient(clienteInfo: UserInfo): Observable<UserInfo> {
    return this.http.put<UserInfo>(`${API_CONFIG.baseUrl}/user/check/${clienteInfo.id}`, clienteInfo);
  }


  updateCompany(company: UpdateCompany): Observable<UpdateCompany> { 
    return this.http.put<UpdateCompany>(`${API_CONFIG.baseUrl}/company/${company.id}`, company);
  }

  temsUse(user: UserInfo): Observable<UserInfo> { 
    
    this.idTerms = parseInt(user.id);
    user.id = '';
    return this.http.put<UserInfo>(`${API_CONFIG.baseUrl}/user/checktermsuse/${this.idTerms}`, user);
  }

  entregarDumpster(dumpster: ClientEntregar): Observable<ClientEntregar> { 
    this.id = dumpster.id;
    dumpster.id = '';
    return this.http.put<ClientEntregar>(`${API_CONFIG.baseUrl}/request/dumpsterLiberate/${this.id}`, dumpster);
  }

  entregeDumpster(dumpster: ClientEntregar): Observable<ClientEntregar> { 
    this.id = dumpster.id;
    dumpster.id = '';
    return this.http.put<ClientEntregar>(`${API_CONFIG.baseUrl}/request/deliverUpdate/${this.id}`, dumpster);
  }

  renovacaoDumpster(dumpster: ClientEntregar): Observable<ClientEntregar> { 
    this.id = dumpster.id;
    dumpster.id = '';
    return this.http.put<ClientEntregar>(`${API_CONFIG.baseUrl}/request/${this.id}`, dumpster);
  }

  recolheDumpster(dumpster: ClientEntregar): Observable<ClientEntregar> { 
    this.id = dumpster.id;
    dumpster.id = '';
    return this.http.put<ClientEntregar>(`${API_CONFIG.baseUrl}/request/retreatUpdate/${this.id}`, dumpster);
  }



  delete(id: any): Observable<CreateDumpster> {
    return this.http.delete<CreateDumpster>(`${API_CONFIG.baseUrl}/dumpster/${id}`);
  }

}
