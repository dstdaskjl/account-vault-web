import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, firstValueFrom } from "rxjs";
import { Vault } from "./vault";
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class VaultService {
  localStorage: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient, private auth: AuthService
    ) {
      this.localStorage = document.defaultView?.localStorage;
  }

  async getVault(): Promise<Vault[]> {
    const token = this.localStorage.getItem('token');
    const vault = await firstValueFrom(
      this.http.post(
        'http://localhost:8000/api/vault/',
        null,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          })
        }
      )
    ) as Vault[];
    return vault;
  }

  create(data: any): Observable<object>{
    const token = this.localStorage.getItem('token');
    return this.http.post(
      'http://localhost:8000/api/vault/create',
      JSON.stringify(data),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      }
    );
  }

  delete(data: any): Observable<object>{
    const token = this.localStorage.getItem('token');
    return this.http.post(
      'http://localhost:8000/api/vault/delete',
      JSON.stringify(data),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      }
    )
  }
}
