import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from 'src/app/dto/Result';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private static API = 'api/project';

  constructor(private http: _HttpClient) { }

  getProjectByTeamId(teamId: string): Observable<Result> {
    return this.http.get<Result>(`${ProjectService.API}/getProjectByTeamId/${teamId}`);
  }

  getProjectByProId(proId: string): Observable<Result> {
    return this.http.get<Result>(`${ProjectService.API}/getProjectByProId/${proId}`);
  }
}
