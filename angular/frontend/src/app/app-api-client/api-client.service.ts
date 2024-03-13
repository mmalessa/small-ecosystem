import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class ApiClientService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  public get(url: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'text/plain; charset=utf-8');
    return this.httpClient
      .get(environment.apiBaseUrl + url, {headers: headers, responseType: "text"})
  }
}
