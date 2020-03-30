import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from 'src/app/dto/Result';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private static API = 'api/files';

  constructor(private http: _HttpClient) {}

  getFilesByProId(proId: string): Observable<Result> {
    return this.http.get<Result>(`${FilesService.API}/getFilesByProId/${proId}`);
  }
}
