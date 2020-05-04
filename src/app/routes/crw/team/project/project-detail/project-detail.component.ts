import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project.service';
import { ProjectDto } from 'src/app/dto/projectDto';
import { TaskDto } from 'src/app/dto/TaskDto';
import { MessageService } from 'src/app/services/message/message.service';
import { CacheService } from '@delon/cache';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.less'],
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  userInfo: UserInfoDto;

  userId: string;

  proId: string;

  project: ProjectDto = null;

  task: TaskDto[] = [];

  unFinishTask: TaskDto[] = [];

  isLeader: boolean;

  tabs: any[] = [
    {
      key: 'task',
      tab: '任务',
    },
    {
      key: 'files',
      tab: '文件',
    },
    {
      key: 'notifice',
      tab: '公告',
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private messageService: MessageService,
    private cache: CacheService,
    private taskService: TaskService,
  ) {}

  ngOnInit() {
    this.project = this.initFormData();
    this.proId = this.route.snapshot.paramMap.get('proId');
    this.cache.get<UserInfoDto>('userInfo').subscribe(userInfo => {
      this.userInfo = userInfo;
      this.userId = userInfo.userId;
      this.projectService.getLeaderIdByProId(this.proId, userInfo.userId).subscribe(res => {
        this.isLeader = res.data;
      });
    });

    // this.router.navigateByUrl(`/team/project/project-detail/${this.proId}/task`);
    this.getDatas();
  }

  getDatas(): void {
    // 获取项目信息
    this.projectService.getProjectByProId(this.proId).subscribe(datas => {
      this.project = datas.data;
    });
    // 获取任务信息
    this.taskService.geTaskByProId(this.proId).subscribe(datas => {
      this.task = datas.data;
      this.unFinishTask = this.task.filter(task => task.taskStatus !== '4');
    });
  }

  toTask(key: string): void {
    // console.log(key);
    // 发送消息
    // this.messageService.sendMessage(key);
    this.messageService.data = this.proId;

    this.messageService.isLeader = this.isLeader;
    this.router.navigateByUrl(`/team/project/project-detail/${this.proId}/${key}`);
  }

  onActivate(event: any): void {
    console.log('create:', event);
  }

  onDeactivate(event: any): void {
    console.log('destroy:', event);
  }

  ngOnDestroy(): void {
    this.messageService.data = null;
  }

  /**
   * 初始化数据
   */
  initTaskData(item?: TaskDto): TaskDto {
    return {
      taskId: item ? item.taskId : null,
      proId: item ? item.proId : null,
      taskCreateTime: item ? item.taskCreateTime : null,
      taskStartTime: item ? item.taskStartTime : null,
      taskEndTime: item ? item.taskEndTime : null,
      taskContent: item ? item.taskContent : null,
      userId: item ? item.userId : null,
      taskStatus: item ? item.taskStatus : null,
      taskMark: item ? item.taskMark : null,
      subTaskDtos: item ? item.subTaskDtos : null,
    };
  }

  /**
   * 初始化数据
   */
  initFormData(item?: ProjectDto): ProjectDto {
    return {
      proId: item ? item.proId : null,
      proName: item ? item.proName : null,
      leaderName: item ? item.leaderName : null,
      proDescribe: item ? item.proDescribe : null,
      proDate: item ? item.proDate : null,
      proStartTime: item ? item.proStartTime : null,
      proEndTime: item ? item.proEndTime : null,
      proStatus: item ? item.proStatus : null,
      teamId: item ? item.teamId : null,
      proType: item ? item.proType : null,
      proCurrentNum: item ? item.proCurrentNum : null,
      proLimiedNum: item ? item.proLimiedNum : null,
      seeNum: item ? item.seeNum : null,
      staff: item ? item.staff : null,
      staffList: item ? item.staffList : null,
      taskDto: item ? item.taskDto : null,
    };
  }
}
