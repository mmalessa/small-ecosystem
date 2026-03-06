import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private echoUrl = '/api/echo';

  constructor(private http: HttpClient) {}

  pingEcho(): Observable<any> {
    return this.http.get(this.echoUrl);
  }
}
