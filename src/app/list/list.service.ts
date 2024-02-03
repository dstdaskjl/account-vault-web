import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { List } from "./list";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(private http: HttpClient) { }

  getVault(): Observable<List> {
    return this.http.get('http://localhost:8000/vault') as Observable<List>;
  }

  isAuthenticated(): Observable<any> {
    return this.http.get('http://localhost:8000/is_authenticated') as Observable<any>;
  }
}
