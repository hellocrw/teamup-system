import { Component, OnInit, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { ProBasicListEditComponent } from 'src/app/routes/pro/list/basic-list/edit/edit.component';
import { TeamService } from 'src/app/services/team/team.service';
import { CacheService } from '@delon/cache';
import { TeamDto } from 'src/app/dto/TeamDto';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { TeamEditModalComponent } from './team-edit-modal/team-edit-modal.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.less'],
})
export class ProjectListComponent implements OnInit {
  userId: string;
  /**
   * 所有团队
   */
  teams: TeamDto[];

  myTeams: TeamDto[];

  joinTeams: TeamDto[];
  /**
   * 正在组队
   */
  teamuping: TeamDto[] = null;
  /**
   * 已完成组队
   */
  finishTeams: TeamDto[] = null;

  @ViewChild('teamEditModalComponent', { static: true })
  teamEditModalComponent: TeamEditModalComponent;

  q: any = {
    status: 'all',
  };

  loading = false;
  data: any[] = [];

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modal: ModalHelper,
    private cdr: ChangeDetectorRef,
    private teamService: TeamService,
    private cache: CacheService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cache.get<UserInfoDto>('userInfo').subscribe(f => (this.userId = f.userId));
    this.getData();
  }

  getData(): void {
    // 获取我的团队信息
    this.teamService.getMyTeamProByUserId(this.userId).subscribe(datas => {
      this.myTeams = datas.data;
      console.log('myteams:', this.myTeams);
      this.teams = this.myTeams;
      // this.myTeams.forEach(myTeam => {
      //   this.teams.push(myTeam);
      // });
    });

    // 获取我参与的团队信息
    this.teamService.getJoinTeamProByUserId(this.userId).subscribe(datas => {
      this.joinTeams = datas.data;
      console.log('myjoinTeams:', this.joinTeams);
    });

    console.log('this.tewam:', this.teams);
    this.loading = true;
    this.http.get('/api/list', { count: 5 }).subscribe((res: any) => {
      this.data = res;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  /**
   * 取消
   */
  cancel(): void {}

  /**
   * 获取全部团队信息
   */
  getAllTeams(): void {
    this.teamService.getTeamProByUserId(this.userId).subscribe(res => {
      this.teams = res.data;
    });
  }

  /**
   * 获取正在组队
   */
  getTeaming(event): void {
    this.teamService.getTeamProByUserId(this.userId).subscribe(res => {
      this.teams = res.data;
      this.teams = this.teams.filter(f => f.status === '1');
    });
  }

  /**
   * 获取已完成组队
   */
  getFinishTeams(): void {
    this.teamService.getTeamProByUserId(this.userId).subscribe(res => {
      this.teams = res.data;
      this.teams = this.teams.filter(f => f.status === '2');
    });
  }

  /**
   * 完成组队
   */
  finish(item: TeamDto): void {
    if (this.q.status !== 'all') {
      this.teams = this.teams.filter(f => f !== item);
    } else {
      item.status = '1';
    }
    this.teamService.TeamStatusFinish(item.teamId).subscribe();
  }

  /**
   * 继续组队
   */
  continue(item: TeamDto): void {
    if (this.q.status !== 'all') {
      this.teams = this.teams.filter(f => f !== item);
    } else {
      item.status = '0';
    }
    this.teamService.TeamStatusContinue(item.teamId).subscribe();
  }

  openEdit(team: TeamDto) {
    console.log(team);
    this.teamEditModalComponent.isVisible = true;
  }

  toProList(item: TeamDto): void {
    this.router.navigateByUrl(`team/team-detail/${item.teamId}`);
  }
  delectTeam(item: TeamDto): void {
    this.teamService.delete(item.teamId).subscribe(f => {
      console.log(f);
      this.teams = this.teams.filter(team => team !== item);
      this.msg.success('删除成功');
    });
  }
  // isCollapsed = false;
  // userId: any;
  // teams: TeamDto[] = [];
  // myTeams: TeamDto[] = [];
  // joinTeams: TeamDto[] = [];
  // q: any = {
  //   status: 'all',
  // };
  // loading = false;
  // data: any[] = [];

  // constructor(
  //   private http: _HttpClient,
  //   public msg: NzMessageService,
  //   private modal: ModalHelper,
  //   private cdr: ChangeDetectorRef,
  //   private teamService: TeamService,
  //   private cache: CacheService,
  //   private route: Router,
  // ) {}

  // ngOnInit() {
  //   this.cache.get<UserInfoDto>('userInfo').subscribe(f => (this.userId = f));
  //   this.getData();
  //   // this.route.navigateByUrl('/team/project/project-list/list/1');
  // }

  // getData() {
  //   this.loading = true;
  //   /**
  //    * 获取所有团队信息
  //    */
  //   this.teamService.getTeamProByUserId(this.userId).subscribe(res => {
  //     this.teams = res.data;
  //     console.log('teams:', this.teams);
  //   });

  //   /**
  //    * 获取我创建的团队信息
  //    */
  //   this.teamService.getMyTeamProByUserId(this.userId).subscribe(res => {
  //     this.myTeams = res.data;
  //     console.log('myteams:', this.myTeams);
  //   });

  //   /**
  //    * 获取我参与的团队信息
  //    */
  //   this.teamService.getJoinTeamProByUserId(this.userId).subscribe(res => {
  //     this.joinTeams = res.data;
  //     console.log('joinTeams:', this.joinTeams);
  //   });
  //   this.loading = false;
  //   this.cdr.detectChanges();
  // }

  // openEdit(record: any = {}) {
  //   this.modal.create(ProBasicListEditComponent, { record }, { size: 'md' }).subscribe(res => {
  //     if (record.id) {
  //       record = { ...record, id: 'mock_id', percent: 0, ...res };
  //     } else {
  //       this.data.splice(0, 0, res);
  //       this.data = [...this.data];
  //     }
  //     this.cdr.detectChanges();
  //   });
  // }
}
