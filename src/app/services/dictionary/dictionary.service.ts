import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Result } from 'src/app/dto/Result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private static api = 'api/dictionaries';

  constructor(private http: _HttpClient) { }

  getTeamType(): Observable<Result> {
    return this.http.get<Result>(`${DictionaryService.api}/getTeamType`);
  }
}
