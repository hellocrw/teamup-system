import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from 'src/app/dto/Result';

@Injectable({
  providedIn: 'root',
})
export class UserTeamService {
  private static API = 'api/user_team';

  constructor(private http: _HttpClient) {}

  getUserByTeamId(teamId: string): Observable<Result> {
    return this.http.get<Result>(`${UserTeamService.API}/getUserByTeamId/${teamId}`);
  }
}
