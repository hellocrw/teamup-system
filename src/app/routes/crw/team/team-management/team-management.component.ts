import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { zip } from 'rxjs';
import { TeamService } from 'src/app/services/team/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { MessageService } from 'src/app/services/message/message.service';
import { CacheService } from '@delon/cache';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { TaskService } from 'src/app/services/task/task.service';
import { TaskDto } from 'src/app/dto/TaskDto';
import { STColumn, STChange, STColumnTag } from '@delon/abc';
import { I18NService } from '@core';

const taskStatus: STColumnTag = {
  1: { text: '成功', color: 'green' },
  2: { text: '错误', color: 'red' },
  3: { text: '待完成', color: 'blue' },
  4: { text: '工作中', color: '' },
  5: { text: '已完成', color: 'orange' },
};
@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.less'],
})
export class TeamManagementComponent implements OnInit {
  notice: any[] = [];
  activities: any[] = [];
  radarData: any[];
  loading = true;
  data: any = {};
  offlineIdx = 0;

  userInfo: UserInfoDto = null;

  myTask: TaskDto[] = [];

  userId: any;

  /**
   * 所有团队信息（我的团队和我参加的团队）
   */
  team: any[] = [];

  /**
   * 未完成的项目
   */
  undoneProject: any[] = [];

  /**
   * 所有项目
   */
  projects: any[] = [];

  /**
   * 我的团队
   */
  myTeam: any[] = [];

  /**
   * 我参加的团队
   */
  joinTeam: any[] = [];

  params = { a: 1, b: 2 };
  columns: STColumn[] = [
    // { title: '编号', index: 'taskId' },
    { title: '任务', index: 'taskContent' },
    { title: '状态', index: 'taskStatus', type: 'tag', tag: taskStatus },
  ];

  // region: mock data
  links = [
    {
      title: '操作一',
      href: '',
    },
    {
      title: '操作二',
      href: '',
    },
    {
      title: '操作三',
      href: '',
    },
    {
      title: '操作四',
      href: '',
    },
    {
      title: '操作五',
      href: '',
    },
    {
      title: '操作六',
      href: '',
    },
  ];

  salesPieData = [
    {
      x: '技术类',
      y: 10,
    },
    {
      x: '金融类',
      y: 12,
    },
    {
      x: '社团类',
      y: 11,
    },
    {
      x: '爱好类',
      y: 13,
    },
    {
      x: '兴趣类',
      y: 21,
    },
    {
      x: '其他',
      y: 12,
    },
  ];
  total: string;

  members = [
    {
      id: 'members-1',
      title: '科学搬砖组',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      link: '',
    },
    {
      id: 'members-2',
      title: '程序员日常',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      link: '',
    },
    {
      id: 'members-3',
      title: '设计天团',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
      link: '',
    },
    {
      id: 'members-4',
      title: '中二少女团',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
      link: '',
    },
    {
      id: 'members-5',
      title: '骗你学计算机',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
      link: '',
    },
  ];

  titleMap = {
    y1: this.i18n.fanyi('app.analysis.traffic'),
    y2: this.i18n.fanyi('app.analysis.payments'),
  };
  // endregion

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private teamService: TeamService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private cache: CacheService,
    private i18n: I18NService,
  ) {}

  // format(val: number) {
  //   return `${val}`;
  // }

  offlineChange(idx: number) {
    if (this.data.offlineData[idx].show !== true) {
      this.data.offlineData[idx].show = true;
      this.cdr.detectChanges();
    }
  }

  ngOnInit() {
    this.total = `${this.salesPieData.reduce((pre, now) => now.y + pre, 0).toFixed(2)}`;
    zip(this.http.get('/chart'), this.http.get('/api/notice'), this.http.get('/api/activities')).subscribe(
      ([chart, notice, activities]: [any, any, any]) => {
        this.radarData = chart.radarData;
        this.notice = notice;
        this.activities = activities.map((item: any) => {
          item.template = item.template.split(/@\{([^{}]*)\}/gi).map((key: string) => {
            if (item[key]) return `<a>${item[key].name}</a>`;
            return key;
          });
          return item;
        });
        this.loading = false;
        this.cdr.detectChanges();
      },
    );
    this.getDatas();
  }

  getDatas(): void {
    this.cache.get('userId').subscribe(f => {
      this.userId = f;
      this.taskService.getTaskByUserId(this.userId).subscribe((res: { data: TaskDto[] }) => {
        this.myTask = res.data.filter(h => h.taskStatus === '3' || h.taskStatus === '4');
      });
    });
    const userId: string = this.route.snapshot.paramMap.get('userId');
    // 获取未完成的项目信息
    this.teamService.getTeamProByUserId(userId).subscribe(datas => {
      this.team = datas.data;
      this.team.forEach(element => {
        element.projects.forEach(project => {
          this.projects.push(project);
          if (project.proStatus === '未完成') {
            this.undoneProject.push(project);
          }
        });
      });
      // console.log('projects:', this.projects);
      // console.log('team:', this.team);
    });
    // 获取我的团队信息
    this.teamService.getMyTeamProByTeamId(userId).subscribe(datas => {
      this.myTeam = datas.data;
      // console.log('myTeam:', this.myTeam);
    });

    // 获取我参与的团队信息
    this.teamService.getJoinTeamProByUserId(userId).subscribe(datas => {
      this.joinTeam = datas.data;
      // console.log('joinTeam:', this.joinTeam);
    });
  }

  _click(e: STChange) {
    console.log(e);
  }

  /**
   * 跳转到项目详情页面
   * @param proId 项目ID
   */
  toProjectDetail(proId: string): void {
    // 发送消息
    this.messageService.data = proId;
    this.router.navigateByUrl(`team/project/project-detail/${proId}/task`);
  }

  /**
   * 跳转到团队详情页面
   */
  toTeamDetail(teamId: string): void {
    this.router.navigateByUrl(`team/team-detail/${teamId}`);
  }
}
