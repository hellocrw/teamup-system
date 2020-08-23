import { Component, OnInit, ChangeDetectorRef, ViewChild, Inject, ChangeDetectionStrategy } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivationEnd } from '@angular/router';
import { filter, debounce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { TestService } from 'src/app/services/test.service';
import { LoginInfo } from 'src/app/dto/LoginInfo';
import { Result } from 'src/app/dto/Result';
import { TeamService } from 'src/app/services/team/team.service';
import { DictionaryService } from 'src/app/services/dictionary/dictionary.service';
import { DA_SERVICE_TOKEN, ITokenService, JWTTokenModel } from '@delon/auth';
import { MessageService } from 'src/app/services/message/message.service';
import { TeamDto } from 'src/app/dto/TeamDto';
import { CacheService } from '@delon/cache';
import { TeamTypeDto } from 'src/app/dto/TeamTypeDto';
import { StudyPlanDto } from 'src/app/dto/StudyPlanDto';
import { StudyPlanService } from 'src/app/services/study-plan/study-plan.service';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { StudyPlanModalComponent } from './study-plan/study-plan-modal/study-plan-modal.component';
import { EverydayTaskService } from 'src/app/services/everyday-task/everyday-task.service';
import { EverydayTaskDto } from 'src/app/dto/EverydayTaskDto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.less'],
  providers: [DatePipe],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent implements OnInit {
  // 今日任务抽屉状态
  today_task_visible = false;

  // 添加每天任务抽屉状态
  add_everyday_task_visible = false;

  // 每天任务信息
  everydayTasks: EverydayTaskDto[] = null;

  everydayTask: EverydayTaskDto = {};

  dateFormat = 'yyyy-MM-dd';

  studyPlans: StudyPlanDto[] = null;

  @ViewChild('studyPlanModalCompoment', { static: true })
  studyPlanModalCompoment: StudyPlanModalComponent;

  private router$: Subscription;
  tabs: any[] = [
    {
      key: 'articles',
      tab: '文章',
    },
    {
      key: 'applications',
      tab: '应用',
    },
    {
      key: 'projects',
      tab: '项目',
    },
  ];

  pos = 0;

  proList: any[] = [];

  loading = true;

  /**
   * 项目类型
   */
  teamType = [];

  selectType = [];

  // region: cateogry
  categories = [
    { id: 0, text: '全部', value: false },
    { id: 1, text: '技术类', value: false },
    { id: 2, text: '业余类', value: false },
  ];
  // endregion

  /**
   * 模仿数据
   */
  loginInfo: LoginInfo;

  result: Result;

  teams: TeamDto[] = null;

  user: any;

  searchKey: string;

  // res$: Observable<Result>;

  constructor(
    private router: Router,
    private http: _HttpClient,
    public msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private teamService: TeamService,
    private dictionaryService: DictionaryService,
    private testService: TestService,
    private messageService: MessageService,
    private cache: CacheService,
    private studyPlan: StudyPlanService,
    private everydayTaskService: EverydayTaskService,
    private datePipe: DatePipe,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) { }
  q: any = {
    ps: 8,
    categories: [],
    owners: ['zxx'],
  };

  /**
   * 初始化
   */
  ngOnInit(): void {
    this.searchKey = this.messageService.data;
    this.messageService.data = null;
    // 获取Token信息的相关信息
    this.router$ = this.router.events.pipe(filter(e => e instanceof ActivationEnd)).subscribe(() => this.setActive());
    this.getDatas();
    // 搜索功能的实现，监听输入
    this.messageService.messageSource
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((term: string) => this.teamService.fuzzyQuery(term)),
      )
      .subscribe(res => {
        this.teams = res.data;
        console.log('监听搜索功能', this.teams);
      });
    this.messageService.university
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((item: string) => this.teamService.getTeamByteamScope(item)),
      )
      .subscribe(res => {
        this.teams = res.data.slice(0, 12);
        console.log('监听搜索功能', this.teams);
      });
  }

  /**
   * 获取页面数据
   */
  getDatas(): void {
    // 获取用户基本信息
    this.user = this.tokenService.get(JWTTokenModel).userInfo;
    // 获取缓存中得用户基本信息
    this.cache.get<UserInfoDto>('userInfo').subscribe(res => {
      this.studyPlan.getStudyPlans(res.userId).subscribe(f => {
        this.studyPlans = f.data;
        console.log('studyPlans:', this.studyPlans);
      });
    });
    // 获取团队类型teamType,将项目类型保存在缓存中
    this.dictionaryService.getTeamType().subscribe(datas => {
      this.teamType = datas.data;
      this.cache.set<TeamTypeDto[]>('teamType', datas.data);
    });
    // 获取所有团队信息
    this.teamService.getTeams().subscribe(datas => {
      this.teams = datas.data.slice(0, 12);
      console.log('all teams: ', this.teams);
    });
  }

  changeCategory(status: boolean, idx: number) {
    console.log(status);
    this.msg.success(`${idx}`);
    if (idx === 0) {
      this.categories.map(i => (i.value = status));
    } else {
      this.categories[idx].value = status;
    }
  }

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    const idx = this.tabs.findIndex(w => w.key === key);
    if (idx !== -1) {
      this.pos = idx;
    }
  }

  to(item: any) {
    this.router.navigateByUrl(`/pro/list/${item.key}`);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.router$.unsubscribe();
  }

  toTeamDetail() { }

  getMoreData() {
    this.router.navigateByUrl('/team/team-more');
  }

  /**
   * 类型搜索
   */
  search(item?: any): Observable<Result> {
    // this.msg.success('查找');
    this.msg.success(item);
    console.log('1:', item);
    this.teamService.getTeamByTeamType(item).subscribe(res => (this.teams = res.data.slice(0, 12)));
    console.log('temp:', this.messageService.data);
    return null;
  }

  addStudyPlan($event): void {
    console.log($event);
    this.studyPlanModalCompoment.isVisible = true;
  }

  getChildData(data: StudyPlanDto) {
    this.studyPlans.push(data);
    this.studyPlans.sort((a, b) => Number(new Date(b.spTime)) - Number(new Date(a.spTime)));
  }

  /**
   * 打开抽屉
   */
  openDrawer(): void {
    this.today_task_visible = true;
    // 获取每天任务信息
    this.everydayTaskService.queryEverydayTask(this.user.userId).subscribe(res => {
      this.everydayTasks = res.data;
      console.log('everyTasks=====', this.everydayTasks);
    });
  }

  // 添加每天任务抽屉
  openAddTaskDrawer() {
    this.add_everyday_task_visible = true;
  }
  /**
   * 关闭抽屉
   */
  closeDrawer(): void {
    this.today_task_visible = false;
    this.add_everyday_task_visible = false;
  }

  /**
   * 任务完成
   */
  finishDayTask(event): void {
    console.log('event=====', event);
  }

  /**
   * 添加每天任务信息
   */
  commitEverydayTask(): void {
    console.log('测试', this.everydayTask);
    this.everydayTask.finish = '0';
    this.everydayTask.userId = this.user.userId;
    console.log('value', this.everydayTask);
    this.everydayTaskService.createEverydayTask(this.everydayTask).subscribe(res => {
      console.log('commitEverydayTask', res.data);
    });
    this.everydayTask = {};
    this.add_everyday_task_visible = false;
  }

  /**
   * 打卡
   */
  clock(item: EverydayTaskDto): void {
    console.log('clock', item);
    this.everydayTaskService.clock(this.user.userId, item.everydayTaskId).subscribe(res => {
      if (res.status === 200) {
        this.everydayTasks = this.everydayTasks.filter(element => element.everydayTaskId !== item.everydayTaskId);
        console.log('打卡成功');
        const studyPlan: StudyPlanDto = this.initStudyPlanDatas();
        studyPlan.spTitle = item.content;
        studyPlan.spTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');
        studyPlan.spContext = '每天任务';
        studyPlan.spLink = 'http://localhost:4200/#/team';
        console.log('=======', studyPlan);
        this.studyPlans.unshift(studyPlan);
        // TODO 排序不生效bug
        // this.studyPlans = this.studyPlans.sort((a, b) => Number(new Date(b.spTime)) - Number(new Date(a.spTime)));
      }
    });
  }

  initStudyPlanDatas(item?: StudyPlanDto): StudyPlanDto {
    return {
      spId: item ? item.spId : null,
      userId: item ? item.userId : null,
      spTitle: item ? item.spTitle : null,
      spContext: item ? item.spContext : null,
      spTime: item ? item.spTime : null,
      spLink: item ? item.spLink : null,
    };
  }

  // 删除每天任务
  delete(item: EverydayTaskDto): void {
    console.log(item);
    this.everydayTaskService.delete(item.everydayTaskId).subscribe(res => {
      if (res.status === 200) {
        this.everydayTasks = this.everydayTasks.filter(everyTask => everyTask.everydayTaskId !== item.everydayTaskId);
        this.msg.success("删除成功");
      }
    })
  }
}
