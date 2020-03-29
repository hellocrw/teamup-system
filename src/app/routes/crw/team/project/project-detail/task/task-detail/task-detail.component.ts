import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskComponent } from '../task.component';
import { TaskDto } from 'src/app/dto/TaskDto';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.less'],
})
export class TaskDetailComponent implements OnInit {
  editStr = '曹荣武';
  taskDate = '2017-07-07 ~ 2017-08-08';
  // 是否显示对话框
  isVisible = false;

  task: TaskDto;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    // console.log('task onInit');
    this.task = this.initFormData();
    // this.messageService.message$.subscribe(proId => console.log('proId:', proId));
    // console.log('task destroy');
  }

  /**
   * 初始化数据
   */
  initFormData(item?: TaskDto): TaskDto {
    return {
      taskId: item ? item.taskId : null,
      teamId: item ? item.teamId : null,
      proId: item ? item.proId : null,
      taskCreateTime: item ? item.taskCreateTime : null,
      taskStartTime: item ? item.taskStartTime : null,
      taskEndTime: item ? item.taskEndTime : null,
      taskContent: item ? item.taskContent : null,
      userId: item ? item.userId : null,
      taskStatus: item ? item.taskStatus : null,
      taskMark: item ? item.taskMark : null,
      subTaskDto: item ? item.subTaskDto : null,
    };
  }

  /**
   * 确定
   */
  handleCancel() {
    this.isVisible = false;
  }

  /**
   * 取消
   */
  handleOk() {
    this.isVisible = false;
  }
}
