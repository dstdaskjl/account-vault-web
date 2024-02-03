import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }

  isAuthenticated(): Observable<any> {
    return this.http.get('http://localhost:8000/is_authenticated') as Observable<any>;
  }
}
