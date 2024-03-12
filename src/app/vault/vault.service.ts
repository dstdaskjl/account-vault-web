import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, firstValueFrom } from "rxjs";
import { Vault } from "./vault";

@Injectable({
  providedIn: 'root'
})
export class VaultService {
  constructor(
    private http: HttpClient,
    ) { }

  async getVault(): Promise<Vault[]> {
    const token = localStorage.getItem('token');
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
    const token = localStorage.getItem('token');
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
    const token = localStorage.getItem('token');
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
