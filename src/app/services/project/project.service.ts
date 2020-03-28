import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from 'src/app/dto/Result';
import { ProjectDto } from 'src/app/dto/projectDto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private static API = 'api/project';

  constructor(private http: _HttpClient) {}

  getproAll(): Observable<Result> {
    return this.http.get<Result>(`${ProjectService.API}/all`);
  }

  getProjectByTeamId(teamId: string): Observable<Result> {
    return this.http.get<Result>(`${ProjectService.API}/getProjectByTeamId/${teamId}`);
  }

  /**
   * 根据proId获取项目信息以及任务信息
   */
  getProjectTaskByProId(proId: string): Observable<Result> {
    return this.http.get<Result>(`${ProjectService.API}/getProjectTaskByProId/${proId}`);
  }

  getProjectByProId(proId: string): Observable<Result> {
    return this.http.get<Result>(`${ProjectService.API}/getProjectByProId/${proId}`);
  }

  /**
   * 保存新建项目信息
   */
  saveProject(projectDto: ProjectDto): Observable<Result> {
    return this.http.post<Result>(`${ProjectService.API}`, projectDto);
  }
}
