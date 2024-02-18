import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Vault } from "./vault";

@Injectable({
  providedIn: 'root'
})
export class VaultService {
  constructor(private http: HttpClient) { }

  getVault(): Observable<Vault> {
    return this.http.get('http://localhost:8000/vault') as Observable<Vault>;
  }
}
