import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { ResetPass } from '../models/resetPassword';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  reset(resetP: ResetPass): Observable<ResetPass> {
    return this.http.post<ResetPass>(`${API_CONFIG.baseUrl}/defpassword`, resetP);
  }
}
