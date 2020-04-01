import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  team: TeamDto = null;
  projects: ProjectDto[] = [];
  teamId: string;

  userTeam: UserTeamDto[] = [];

  list: any[] = [];
  loading = false;

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
      buttons: [
        {
          text: '踢出',
          type: 'link',
          click: (e: any) => console.log('btn click', e),
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
  ) {}

  ngOnInit() {
    this.team = this.initDatas();
    this.teamId = this.route.snapshot.paramMap.get('teamId');
    this.getDatas();
  }

  initDatas(item?: TeamDto): TeamDto {
    return {
      teamId: item ? item.teamId : null,
      teamName: item ? item.teamName : null,
      leaderId: item ? item.leaderId : null,
      teamDescribe: item ? item.teamDescribe : null,
      teamType: item ? item.teamType : null,
      teamScope: item ? item.teamScope : null,
      teamNumber: item ? item.teamNumber : null,
      teamDate: item ? item.teamDate : null,
      status: item ? item.status : null,
      staff: item ? item.staff : null,
      teamNature: item ? item.teamNature : null,
      teamLabel: item ? item.teamLabel : null,
      seeNum: item ? item.seeNum : null,
      projects: item ? item.projects : null,
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
  }

  /**
   * 跳转到项目详情页面
   */
  toProDetail(proId: string): void {
    this.messageService.data = proId;
    this.router.navigateByUrl(`team/project/project-detail/${proId}/task`);
  }
}
