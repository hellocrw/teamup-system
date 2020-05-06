import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from 'src/app/dto/Result';
import { TaskDto } from 'src/app/dto/TaskDto';

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

  /**
   * 保存任务信息
   */
  saveTask(task: TaskDto): Observable<Result> {
    return this.http.post<Result>(`${TaskService.API}`, task);
  }

  /**
   * 通过用户ID获取任务信息
   */
  getTaskByUserId(userId: string): Observable<Result> {
    return this.http.get<Result>(`${TaskService.API}/getTaskByUserId/${userId}`);
  }

  /**
   * 更新任务状态
   */
  updateTaskByTaskId(taskId: string): Observable<Result> {
    return this.http.get<Result>(`${TaskService.API}/updateTaskByTaskId/${taskId}`);
  }

  update(taskId: string, task: TaskDto): Observable<Result> {
    return this.http.put<Result>(`${TaskService.API}/${taskId}`, task);
  }
}
