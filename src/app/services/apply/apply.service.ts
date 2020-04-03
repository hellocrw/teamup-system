import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/dto/Result';
import { _HttpClient } from '@delon/theme';
import { ApplyDto } from 'src/app/dto/ApplyDto';

@Injectable({
  providedIn: 'root',
})
export class ApplyService {
  private static API = 'api/apply';

  constructor(private http: _HttpClient) {}

  /**
   * 根据用户ID获取申请信息
   */
  getApplyByUserId(userId: string): Observable<Result> {
    return this.http.get<Result>(`${ApplyService.API}/getApplyByUserId/${userId}`);
  }

  /**
   * 获取别人的入队申请信息
   */
  getEnqueueApply(userId: string): Observable<Result> {
    return this.http.get<Result>(`${ApplyService.API}/getEnqueueApply/${userId}`);
  }

  /**
   * 保存申请信息
   */
  create(applyInfo: ApplyDto): Observable<Result> {
    return this.http.post<Result>(`${ApplyService.API}/create`, applyInfo);
  }
}
