import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from 'src/app/dto/Result';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  /**
   * API
   */
  private static API = 'api/task';

  constructor(private http: _HttpClient) {}

  getTaskById(taskId: string): Observable<Result> {
    return this.http.get<Result>(`${TaskService.API}/getTaskByProId`, taskId);
  }

  /**
   * 获取项目中的任务信息
   * @param proId 项目ID
   */
  geTaskByProId(proId: string): Observable<Result> {
    return this.http.get<Result>(`${TaskService.API}/geTaskByProId/${proId}`);
  }
}
