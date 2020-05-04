import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { Result } from 'src/app/dto/Result';
import { FilesDto } from 'src/app/dto/FilesDto';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private static API = 'api/files';

  constructor(private http: _HttpClient) {}

  getFilesByProId(proId: string): Observable<Result> {
    return this.http.get<Result>(`${FilesService.API}/getFilesByProId/${proId}`);
  }

  /**
   * 保存文件信息
   */
  saveFile(files: FilesDto): Observable<Result> {
    return this.http.post<Result>(`${FilesService.API}/saveFile`, files);
  }
}
