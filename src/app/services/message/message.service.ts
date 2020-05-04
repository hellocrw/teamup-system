import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public data: string = null;

  public isLeader: boolean;

  /**
   * 输入关键字，发布
   */
  public messageSource = new Subject<string>();

  /**
   * 学校范围搜索
   */
  public university = new Subject<string>();

  message$ = this.messageSource.asObservable();

  sendMessage(name: string) {
    this.messageSource.next(name);
  }

  sendUniversityScope(universityScope: string) {
    this.university.next(universityScope);
  }
}
