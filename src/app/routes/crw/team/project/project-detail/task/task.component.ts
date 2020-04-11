import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { ProjectService } from 'src/app/services/project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectDetailComponent } from '../project-detail.component';
import { TaskService } from 'src/app/services/task/task.service';
import { TaskDto } from 'src/app/dto/TaskDto';
import { NzMessageService } from 'ng-zorro-antd';
import { MessageService } from 'src/app/services/message/message.service';
import { Subscription } from 'rxjs';

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
export class TaskComponent implements OnInit, OnDestroy {
  sub: Subscription;

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

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private msg: NzMessageService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    // console.log('task.proId:', this.projectDetailComponent.proId);
    // tslint:disable-next-line: no-string-literal
    // console.log('proId:', this.route.snapshot.params['name']);
    // console.log(
    //   'proId:',
    //   this.route.queryParams.subscribe(data => console.log(data.name)),
    // );
    // 订阅
    // this.messageService.message$.subscribe(data => (this.proId = data));
    console.log('proId:', this.messageService.data);
    this.proId = this.messageService.data;
    this.getData();
    if (this.proId === null) {
      this.router.navigateByUrl('/team');
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngDoCheck(): void {
    // console.log('proId:', this.messageService.data);
  }

  ngOnDestroy(): void {
    // TODO 取消订阅有bug
    // 取消订阅
    // this.sub.unsubscribe();
    // this.messageService.data = null;
  }

  getData(): void {
    this.taskService.geTaskByProId(this.proId).subscribe(datas => {
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

  /**
   * 领取任务
   */
  confirm(item: TaskDto): void {
    console.log('2:', item);
    this.taskService.updateTaskByTaskId(item.taskId).subscribe(f => console.log(f));
    this.taskPool = this.taskPool.filter(f => f !== item);
    this.taskTodo.push(item);
    this.msg.success(item.taskContent + '任务已领取');
  }

  /**
   * 开始工作
   */
  startWork(item: TaskDto): void {
    this.taskService.updateTaskByTaskId(item.taskId).subscribe(f => console.log(f));
    this.taskTodo = this.taskTodo.filter(f => f !== item);
    this.taskWork.push(item);
    this.msg.success(item.taskContent + '开始工作');
  }

  /**
   * 完成任务
   */
  finish(item: TaskDto): void {
    this.taskService.updateTaskByTaskId(item.taskId).subscribe(f => console.log(f));
    this.taskWork = this.taskWork.filter(f => f !== item);
    this.taskFinish.push(item);
    this.msg.success(item.taskContent + '已完成');
  }

  cancel() {
    console.log('取消');
  }
}
