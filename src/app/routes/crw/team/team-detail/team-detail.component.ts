import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team/team.service';
import { _HttpClient } from '@delon/theme';
import { STColumn, STChange, STColumnTag } from '@delon/abc';
import { UserTeamDto } from 'src/app/dto/UserTeamDto';
import { UserTeamService } from 'src/app/services/user-team/user-team.service';
import { TeamDto } from 'src/app/dto/TeamDto';
import { ProjectDto } from 'src/app/dto/projectDto';
import { MessageService } from 'src/app/services/message/message.service';
import { AddProjectModalComponent } from './add-project-modal/add-project-modal.component';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';
import { NzMessageService } from 'ng-zorro-antd';
import { TeamTypeService } from 'src/app/services/team-type/team-type.service';
import { TeamTypeDto } from 'src/app/dto/TeamTypeDto';
import { CacheService } from '@delon/cache';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';

const isLeader: STColumnTag = {
  0: { text: '队员', color: 'green' },
  1: { text: '队长', color: 'blue' },
};
@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.less'],
})
export class TeamDetailComponent implements OnInit {
  team: TeamDto;

  isLeader = true;

  userId: string;

  projects: ProjectDto[] = [];

  teamId: string;

  userTeam: UserTeamDto[] = [];

  list: any[] = [];

  loading = false;

  @ViewChild('addProjectModalComponent', { static: true })
  addProjectModalComponent: AddProjectModalComponent;

  q: any = {
    ps: 4,
    categories: [],
    owners: ['zxx'],
  };

  params = { a: 1, b: 2 };
  // mock
  columns: STColumn[] = [
    // { title: '编号', index: 'id' },
    { title: '姓名', index: 'userName' },
    { title: '角色', index: 'isLeader', type: 'tag', tag: isLeader },
    {
      title: '操作',
      iif: () => this.isLeader,
      buttons: [
        {
          text: '踢出',
          acl: 'isLeader',
          type: 'link',
          pop: {
            title: '确定踢出吗',
          },
          click: (e: any) => {
            console.log('btn click', e);
            this.userTeamService.deleteByUtId(e.utId).subscribe();
            this.userTeam = this.userTeam.filter(f => e.utId !== f.utId);
            console.log('踢出成功');
          },
        },
      ],
    },
  ];

  _click(e: STChange) {
    console.log(e);
  }
  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router,
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private userTeamService: UserTeamService,
    private messageService: MessageService,
    private userInfoService: UserInfoService,
    private projectService: ProjectService,
    private msg: NzMessageService,
    private cache: CacheService,
  ) {}

  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('teamId');
    // this.cache.get<boolean>('isLeader').subscribe(f => (this.isLeader = f));
    console.log(this.isLeader);
    this.isLeader = this.messageService.isLeader;
    this.team = this.initDatas();
    this.projects.forEach(project => {
      this.initProjectData(project);
    });

    this.getDatas();
  }

  initDatas(item?: TeamDto): TeamDto {
    return {
      teamId: item ? item.teamId : null,
      teamName: item ? item.teamName : null,
      adminId: item ? item.adminId : null,
      leaderId: item ? item.leaderId : null,
      leaderName: item ? item.leaderName : null,
      teamDescribe: item ? item.teamDescribe : null,
      teamType: item ? item.teamType : null,
      teamScope: item ? item.teamScope : null,
      teamNumber: item ? item.teamNumber : null,
      sumNumber: item ? item.sumNumber : null,
      teamDate: item ? item.teamDate : null,
      status: item ? item.status : null,
      staff: item ? item.staff : null,
      teamNature: item ? item.teamNature : null,
      teamLabel: item ? item.teamLabel : null,
      seeNum: item ? item.seeNum : null,
      projects: item ? item.projects : null,
    };
  }

  initProjectData(item?: ProjectDto): ProjectDto {
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
    };
  }

  getDatas(more = false): void {
    this.loading = true;
    this.http.get('/api/list', { count: this.q.ps }).subscribe((res: any) => {
      this.list = more ? this.list.concat(res) : res;
      this.loading = false;
      this.cdr.detectChanges();
    });
    // 获取对应的团队信息以及项目信息
    this.teamService.getTeamProByTeamId(this.teamId).subscribe(datas => {
      this.team = datas.data;
      console.log('teams:', this.team);
      this.projects = this.team.projects;
      console.log('projects:', this.projects);
    });
    // 获取用户-团队信息
    this.userTeamService.getUserByTeamId(this.teamId).subscribe(f => (this.userTeam = f.data));
    // TODO
    // 获取队长信息
    this.userInfoService.getLeaderByTeamId(this.teamId).subscribe(f => {
      const leader: UserTeamDto = {};
    });
  }

  /**
   * 跳转到项目详情页面
   */
  toProDetail(proId: string): void {
    this.messageService.data = proId;
    this.router.navigateByUrl(`team/project/project-detail/${proId}/task`);
  }
  /**
   * 编辑
   */
  openEditModal(): void {
    this.addProjectModalComponent.isVisible = true;
    this.addProjectModalComponent.team = this.team;
  }

  // 获取子组件添加的项目信息
  eventHandler(project: ProjectDto): void {
    console.log('project--->', project);
    this.projects = [...this.projects];
    this.projects.push(project);
  }

  /**
   * 删除项目
   */
  deleteProject(item: ProjectDto): void {
    this.projectService.delete(item.proId).subscribe();
    this.projects = this.projects.filter(project => project.proId !== item.proId);
    this.msg.success('删除成功');
  }
  cancel(): void {}

  /**
   * 修改项目
   */
  updateProject(item: ProjectDto): void {
    // this.msg.success(`项目id${item.proId}`);
    this.addProjectModalComponent.isVisible = true;
    this.addProjectModalComponent.item = item;
  }
}
