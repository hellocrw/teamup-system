import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from 'src/app/dto/Result';

@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  private static API = 'api/notice';

  constructor(private http: _HttpClient) {}

  getNoticesByProId(proId: string): Observable<Result> {
    return this.http.get<Result>(`${NoticeService.API}/getNoticesByProId/${proId}`);
  }
}
