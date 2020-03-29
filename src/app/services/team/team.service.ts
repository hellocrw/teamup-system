import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Result } from 'src/app/dto/Result';
import { Observable } from 'rxjs';
import { TeamDto } from 'src/app/dto/TeamDto';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private static API = 'api/team';

  constructor(private http: _HttpClient) {}

  /**
   * 获取团队以及团队对应的项目
   */
  getTeams(): Observable<Result> {
    return this.http.get<Result>(`${TeamService.API}/getTeams`);
  }

  /**
   * 根据团队ID获取团队信息以及对应的项目信息
   * @param teamId 团队ID
   */
  getTeamProByTeamId(teamId: string): Observable<Result> {
    return this.http.get<Result>(`${TeamService.API}/getTeamProByTeamId/${teamId}`);
  }

  /**
   * 通过用户ID获取团队信息以及团队的项目信息
   * @param teamId 用户ID
   */
  getTeamProByUserId(userId: string): Observable<Result> {
    return this.http.get<Result>(`${TeamService.API}/getTeamProByUserId/${userId}`);
  }

  /**
   * 通过用户ID获取我的团队信息以及对应的项目信息
   * @param userId 用户ID
   */
  getMyTeamProByTeamId(userId: string): Observable<Result> {
    return this.http.get<Result>(`${TeamService.API}/getMyTeamProByUserId/${userId}`);
  }

  /**
   * 通过用户ID获取我参与的团队信息以及对应的项目信息
   * @param userId 用户ID
   */
  getJoinTeamProByUserId(userId: string): Observable<Result> {
    return this.http.get<Result>(`${TeamService.API}/getJoinTeamProByUserId/${userId}`);
  }

  /**
   * 获取所有团队信息
   */
  getTeamAll(): Observable<Result> {
    return this.http.get<Result>(`${TeamService.API}/all`);
  }

  /**
   * 保存团队信息
   */
  saveTeam(teamDto: TeamDto): Observable<Result> {
    return this.http.post<Result>(`${TeamService.API}/saveTeam`, teamDto);
  }

  /**
   * 模糊查询团队信息
   */
  fuzzyQuery(teamName?: string): Observable<Result> {
    return this.http.get<Result>(`${TeamService.API}/getTeamByTeamName/${teamName}`);
  }
}
