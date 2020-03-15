import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from 'src/app/dto/Result';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private static API = 'api/project';

  constructor(private http: _HttpClient) { }

  getproAll(): Observable<Result> {
    return this.http.get<Result>(`${ProjectService.API}/all`);
  }

  getProjectByTeamId(teamId: string): Observable<Result> {
    return this.http.get<Result>(`${ProjectService.API}/getProjectByTeamId/${teamId}`);
  }

  getProjectTaskByProId(proId: string): Observable<Result> {
    return this.http.get<Result>(`${ProjectService.API}/getProjectTaskByProId/${proId}`);
  }

  /**
   * 获取项目中的任务信息
   * @param proId 项目ID
   */
  geTaskByProId(proId: string): Observable<Result> {
    return this.http.get<Result>(`${ProjectService.API}/geTaskByProId/${proId}`);
  }
}
