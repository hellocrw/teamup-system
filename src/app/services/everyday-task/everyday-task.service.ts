import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from 'src/app/dto/Result';
import { EverydayTaskDto } from 'src/app/dto/EverydayTaskDto';

@Injectable({
  providedIn: 'root',
})
export class EverydayTaskService {
  private static API = 'api/everyday-task';

  constructor(private http: _HttpClient) {}

  // 查看每天任务信息
  queryEverydayTask(userId: string): Observable<Result> {
    return this.http.get<Result>(`${EverydayTaskService.API}/query/${userId}`);
  }

  // 添加每天任务信息
  createEverydayTask(everydayTask: EverydayTaskDto): Observable<Result> {
    return this.http.post<Result>(`${EverydayTaskService.API}/create`, everydayTask);
  }

  /**
   * 打卡
   */
  clock(userId: string, everydayTaskId: string): Observable<Result> {
    return this.http.get<Result>(`${EverydayTaskService.API}/clock/${userId}/${everydayTaskId}`);
  }
}
