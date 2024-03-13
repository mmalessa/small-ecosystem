import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth-service";

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService: AuthService = inject(AuthService);
  const authToken: string = authService.getToken();
console.log(authToken);
    if (authToken != '') {
      const authReq: HttpRequest<any> = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${authToken}`)
      })
      return next(authReq);
    }
    return next(req);
};
