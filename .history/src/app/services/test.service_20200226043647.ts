import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { CacheService } from '@delon/cache';
import { Observable } from 'rxjs';
import { Result } from '../dto/Result';

@Injectable({
  providedIn: 'root'
})
/**
 * 测试服务
 */
export class TestService {

  private static API = "/task";

  constructor(private http: _HttpClient, private cacheService: CacheService) { }

  myTest(): Observable<Result> {
    return this.http.get<Result>(`${TestService.API}/All`);
  }
}
