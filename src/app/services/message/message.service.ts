import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public data: string = null;

  public messageSource = new Subject<string>();

  message$ = this.messageSource.asObservable();

  sendMessage(name: string) {
    this.messageSource.next(name);
  }
}
