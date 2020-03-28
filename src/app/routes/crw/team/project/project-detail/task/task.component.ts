import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { ProjectService } from 'src/app/services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectDetailComponent } from '../project-detail.component';
import { TaskService } from 'src/app/services/task/task.service';
import { TaskDto } from 'src/app/dto/TaskDto';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less'],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.special]': 'test',
    '[attr.aria-label]': 'true',
  },
})
export class TaskComponent implements OnInit {
  index = 0;

  proId: string;

  // project: any;

  /**
   * 所有任务
   */
  tasks: TaskDto[] = [];

  /**
   * 任务池
   */
  taskPool: TaskDto[] = [];

  /**
   * 待完成
   */
  taskTodo: TaskDto[] = [];

  /**
   * 工作中
   */
  taskWork: TaskDto[] = [];

  /**
   * 已完成
   */
  taskFinish: TaskDto[] = [];

  @ViewChild('projectDetailComponent', { static: true })
  projectDetailComponent: ProjectDetailComponent;

  @ViewChild('taskModalComponent', { static: true })
  taskModalComponent: TaskModalComponent;

  @ViewChild('taskDetailComponent', { static: true })
  taskDetailComponent: TaskDetailComponent;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private msg: NzMessageService) {}

  ngOnInit() {
    // console.log('task.proId:', this.projectDetailComponent.proId);
    // tslint:disable-next-line: no-string-literal
    // console.log('proId:', this.route.snapshot.params['name']);
    // console.log(
    //   'proId:',
    //   this.route.queryParams.subscribe(data => console.log(data.name)),
    // );
    this.getData();
  }

  getData(): void {
    this.taskService.geTaskByProId('1').subscribe(datas => {
      this.tasks = datas.data;
      // console.log('task', this.task);
      if (this.tasks == null) {
        return null;
      }
      this.tasks.forEach(task => {
        if (task.taskStatus === '1') {
          this.taskPool.push(task);
        }
        if (task.taskStatus === '2') {
          this.taskTodo.push(task);
        }
        if (task.taskStatus === '3') {
          this.taskWork.push(task);
        }
        if (task.taskStatus === '4') {
          this.taskFinish.push(task);
        }
      });
    });
  }

  /**
   * 根据项目ID获取任务以及子任务信息
   */
  getTasksByProId(proId: string) {}

  create(): void {
    console.log('create');
    this.taskModalComponent.isVisible = true;
  }

  /**
   * 跳转到任务详情页面
   * @param taskId 任务ID
   */
  toTaskDetail(task: TaskDto) {
    this.taskDetailComponent.task = task;
    // console.log(this.taskDetailComponent.task);
    this.taskDetailComponent.isVisible = true;
  }

  confirm() {
    this.msg.success('领取成功');
  }
  cancel() {
    console.log('取消');
  }
}
