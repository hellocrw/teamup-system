import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskDto } from 'src/app/dto/TaskDto';

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

  public task = new Subject<TaskDto>();

  message$ = this.messageSource.asObservable();

  sendMessage(name: string) {
    this.messageSource.next(name);
  }

  sendUniversityScope(universityScope: string) {
    this.university.next(universityScope);
  }

  sendTask(task: TaskDto) {
    this.task.next(task);
  }
}
