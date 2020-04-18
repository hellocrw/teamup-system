import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from 'src/app/dto/Result';
import { NoticeDto } from 'src/app/dto/NoticeDto';

@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  private static API = 'api/notice';

  constructor(private http: _HttpClient) {}

  /**
   * 根据项目ID获取公告信息
   */
  getNoticesByProId(proId: string): Observable<Result> {
    return this.http.get<Result>(`${NoticeService.API}/getNoticesByProId/${proId}`);
  }

  save(param: NoticeDto): Observable<Result> {
    return this.http.post<Result>(`${NoticeService.API}/save`, param);
  }
}
