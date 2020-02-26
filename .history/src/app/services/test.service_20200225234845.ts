import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { CacheService } from '@delon/cache';
import { Observable } from 'rxjs';
import { Result } from '../dto/Result';
import { LoginInfo } from '../dto/LoginInfo';

@Injectable({
  providedIn: 'root'
})
/**
 * 测试服务
 */
export class TestService {

  private static API = "/api/test";

  constructor(private http: _HttpClient, private cacheService: CacheService) { }

  login(param: LoginInfo): Observable<Result> {
    return this.http.post<Result>(`${TestService.API}/login`, param);
  }
}
