import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInfo } from 'src/app/dto/LoginInfo';
import { _HttpClient } from '@delon/theme';
import { CacheService } from '@delon/cache';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private static API = '/api/login/token';

  constructor(private http: _HttpClient, private cacheService: CacheService) { }

  /**
   * 获取Token
   */
  login(loginInfo: LoginInfo) {

  }
}
