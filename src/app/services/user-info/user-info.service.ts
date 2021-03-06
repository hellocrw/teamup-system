import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { Result } from 'src/app/dto/Result';
import { UserRoleDto } from 'src/app/dto/UserRoleDto';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  /**
   * API
   */
  private static API = 'api/user';

  constructor(private http: _HttpClient) {}

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

  /**
   * 通过团队ID获取队长信息
   */
  getLeaderByTeamId(teamId: string): Observable<Result> {
    return this.http.get<Result>(`${UserInfoService.API}/getLeaderByTeamId/${teamId}`);
  }

  /**
   * 用户注册
   */
  register(userRole: UserRoleDto): Observable<Result> {
    return this.http.post<Result>(`${UserInfoService.API}/register?_allow_anonymous=true`, userRole);
  }
}
