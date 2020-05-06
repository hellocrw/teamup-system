import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskComponent } from '../task.component';
import { TaskDto } from 'src/app/dto/TaskDto';
import { MessageService } from 'src/app/services/message/message.service';
import { TaskService } from 'src/app/services/task/task.service';
import { NzMessageService } from 'ng-zorro-antd';

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

  userId: string;

  task: TaskDto;

  constructor(
    private messageService: MessageService,
    private taskService: TaskService,
    private msg: NzMessageService,
  ) {}

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
      proId: item ? item.proId : null,
      taskCreateTime: item ? item.taskCreateTime : null,
      taskStartTime: item ? item.taskStartTime : null,
      taskEndTime: item ? item.taskEndTime : null,
      taskContent: item ? item.taskContent : null,
      userId: item ? item.userId : null,
      userName: item ? item.userName : null,
      taskStatus: item ? item.taskStatus : null,
      taskMark: item ? item.taskMark : null,
      subTaskDtos: item ? item.subTaskDtos : null,
    };
  }

  /**
   * 取消
   */
  handleCancel() {
    // console.log('task测试', this.task);
    this.isVisible = false;
  }

  /**
   * 确定
   */
  handleOk() {
    console.log('task测试', this.task);
    // 更新任务
    this.taskService.update(this.task.taskId, this.task).subscribe();
    this.msg.success('更新成功');
    this.isVisible = false;
  }
}
