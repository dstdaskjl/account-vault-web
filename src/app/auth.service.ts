import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public async isAuthenticated(): Promise<boolean> {
    if (typeof localStorage !== "undefined"){
      const tokenStr = localStorage.getItem("currentToken") as string;
      const tokenObj = JSON.parse(tokenStr);
      if (tokenObj){
        return await this.isTokenValid(tokenObj);
      }
    }
    return false;
  }

  private async isTokenValid(token: any): Promise<boolean> {
    const valid = await firstValueFrom(
      this.http.get(
        'http://localhost:8000/is-token-valid/',
        { params: new HttpParams().set("key", token.key).set("user_id", token.user_id) }
      )
    ) as boolean;
    return valid;
  }
}
