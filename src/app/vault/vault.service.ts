import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { Vault } from "./vault";
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class VaultService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  async getVault(): Promise<Vault[]> {
    const token = this.auth.getCurrentToken();
    if (token){
      const vault = await firstValueFrom(
        this.http.get(
          'http://localhost:8000/get-vault/',
          { params: new HttpParams().set("user_id", token.user_id) }
        )
      ) as Vault[];
      return vault
    }
    return [];
  }
}
