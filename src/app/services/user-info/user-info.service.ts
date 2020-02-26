import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  /**
   * API
   */
  private static URL = '/api/user';

  constructor(private http: _HttpClient) { }

  /**
   * 根据ID查找用户信息
   */
  findById(id: string): Observable<UserInfoDto> {
    return this.http.get<any>(`${UserInfoService.URL}/${id}`);
  }

  /**
   * 查找所有用户的信息
   */
  findAll(): Observable<any> {
    return this.http.get<any>('api/user/All');
  }

}
