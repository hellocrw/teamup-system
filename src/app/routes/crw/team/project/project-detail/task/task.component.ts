import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {

  index = 0;

  @ViewChild('taskModalComponent', { static: true })
  taskModalComponent: TaskModalComponent;

  @ViewChild('taskDetailComponent', { static: true })
  taskDetailComponent: TaskDetailComponent;

  constructor() { }

  ngOnInit() {
  }

  create(): void {
    console.log('create');
    this.taskModalComponent.isVisible = true;
  }

  /**
   * 跳转到任务详情页面
   * @param taskId 任务ID
   */
  toTaskDetail(taskId: string) {
    this.taskDetailComponent.isVisible = true;
  }

}
