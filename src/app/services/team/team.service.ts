import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Result } from 'src/app/dto/Result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private static API = "api/team"

  constructor(private http: _HttpClient) { }

  getTeams(): Observable<Result> {
    return this.http.get<Result>(`${TeamService.API}/getTeams`);
  }
}
