import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from 'src/app/dto/Result';
import { UserTeamDto } from 'src/app/dto/UserTeamDto';

@Injectable({
  providedIn: 'root',
})
export class UserTeamService {
  private static API = 'api/user_team';

  constructor(private http: _HttpClient) {}

  getUserByTeamId(teamId: string): Observable<Result> {
    return this.http.get<Result>(`${UserTeamService.API}/getUserByTeamId/${teamId}`);
  }

  /**
   * 保存关联表信息
   */
  save(userTeamDto: UserTeamDto): Observable<Result> {
    return this.http.post<Result>(`${UserTeamService.API}/save`, userTeamDto);
  }

  /**
   * 踢出成员
   */
  deleteByUtId(utId: string): Observable<Result> {
    return this.http.delete<Result>(`${UserTeamService.API}/${utId}`);
  }

  /**
   * 判断团队是否存在该用户
   */
  existInTeam(userId: string, teamId: string): Observable<Result> {
    return this.http.get<Result>(`${UserTeamService.API}/existInTeam/${userId}/${teamId}`);
  }
}
