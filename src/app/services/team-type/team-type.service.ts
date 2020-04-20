import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/dto/Result';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root',
})
export class TeamTypeService {
  private static API = 'api/team_type';

  constructor(private http: _HttpClient) {}

  /**
   * 获取团队分析数据
   */
  getTeamTypeNumber(userId: string): Observable<Result> {
    return this.http.get<Result>(`${TeamTypeService.API}/getTeamTypeNumber/${userId}`);
  }

  /**
   * 获取项目分析数据
   */
  getProTypeNumber(userId: string): Observable<Result> {
    return this.http.get<Result>(`${TeamTypeService.API}/getProTypeNumber/${userId}`);
  }

  /**
   * 获取任务分析数据
   */
  getTaskTypeNumber(userId: string): Observable<Result> {
    return this.http.get<Result>(`${TeamTypeService.API}/getTaskTypeNumber/${userId}`);
  }

  /**
   * 管理员获取团队分析数据
   */
  getTeamAnalysis(): Observable<Result> {
    return this.http.get<Result>(`${TeamTypeService.API}/getTeamAnalysis/`);
  }

  /**
   * 管理员获取用户分析数据
   */
  getUserAnalysis(): Observable<Result> {
    return this.http.get<Result>(`${TeamTypeService.API}/getUserAnalysis/`);
  }
}
