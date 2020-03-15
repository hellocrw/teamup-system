import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { Result } from 'src/app/dto/Result';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  /**
   * API
   */
  private static API = 'api/user';

  constructor(private http: _HttpClient) { }

  /**
   * 根据ID查找用户信息
   */
  findById(id: string): Observable<UserInfoDto> {
    return this.http.get<any>(`${UserInfoService.API}/${id}`);
  }

  /**
   * 查找所有用户的信息
   */
  findAll(): Observable<any> {
    return this.http.get<any>('api/user/all');
  }

  /**
   * 获取管理员信息
   */
  getAdminInfo(): Observable<Result> {
    return this.http.get<Result>(`${UserInfoService.API}/getAdminInfo`);
  }

  /**
   * 获取用户信息
   */
  getUserInfo(): Observable<Result> {
    return this.http.get<Result>(`${UserInfoService.API}/getUserInfo`);
  }

}
