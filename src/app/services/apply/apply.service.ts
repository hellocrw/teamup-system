import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/dto/Result';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root',
})
export class ApplyService {
  private static API = 'api/apply';

  constructor(private http: _HttpClient) {}

  getApplyByUserId(userId: string): Observable<Result> {
    return this.http.get<Result>(`${ApplyService.API}/getApplyByUserId/${userId}`);
  }
}
