import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskModalComponent } from './task-modal/task-modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {

  index = 0;

  @ViewChild('taskModalComponent', { static: true })
  taskModalComponent: TaskModalComponent;

  constructor() { }

  ngOnInit() {
  }

  create(): void {
    console.log('create');
    this.taskModalComponent.isVisible = true;
  }

}
