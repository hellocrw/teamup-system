import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from 'src/app/dto/Result';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  /**
   * API
   */
  private static API = "api/task";

  constructor(private http: _HttpClient) { }

  getTaskById(taskId: string): Observable<Result> {
    return this.http.get<Result>(`${TaskService.API}/getTaskByProId`, taskId);
  }

}
