import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project.service';
import { ProjectDto } from 'src/app/dto/projectDto';
import { TaskDto } from 'src/app/dto/TaskDto';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.less'],
})
export class ProjectDetailComponent implements OnInit {
  proId: string;

  project: ProjectDto = null;

  task: TaskDto[] = null;

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
    private taskService: TaskService,
  ) {}

  ngOnInit() {
    this.project = this.initFormData();
    this.proId = this.route.snapshot.paramMap.get('proId');
    // this.router.navigateByUrl(`/team/project/project-detail/${this.proId}/task`);
    this.getDatas();
  }

  getDatas(): void {
    this.projectService.getProjectByProId(this.proId).subscribe(datas => {
      this.project = datas.data;
    });
  }

  to(key: string): void {
    // console.log(key);
    this.router.navigate([`/team/project/project-detail/${this.proId}/${key}`], {
      queryParams: { name: 'josk' },
    });
  }

  onActivate(event): void {
    console.log('create:', event);
  }

  onDeactivate(event): void {
    console.log('destroy:', event);
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
      number: item ? item.number : null,
      seeNum: item ? item.seeNum : null,
      staff: item ? item.staff : null,
      staffList: item ? item.staffList : null,
      taskDto: item ? item.taskDto : null,
    };
  }
}
