import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Result } from 'src/app/dto/Result';
import { Observable } from 'rxjs';
import { LoginInfo } from 'src/app/dto/LoginInfo';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private static API = 'api/token';

  constructor(private http: _HttpClient) {}

  getToken(type: number, username: string, password: string): Observable<Result> {
    const params = {};
    Object.assign(params, type ? { type } : {});
    Object.assign(params, username ? { username } : {});
    Object.assign(params, password ? { password } : {});
    return this.http.post(`${TokenService.API}/getToken?_allow_anonymous=true'`, params);
  }

  alterPwd(password: string, newPassword: string): Observable<Result> {
    return this.http.post<Result>(`${TokenService.API}/alter-password`, password, newPassword);
  }
}
