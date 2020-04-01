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

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent implements OnInit {
  dateFormat = 'yyyy-MM-dd';

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

  proList: any[] = [
    // {
    //   id: 1,
    //   proName: '组队系统',
    //   img: 'https://gw.alipayobjects.com/zos/rmsportal/HrxcVbrKnCJOZvtzSqjN.png',
    //   proDescribe: '那是一种内在的东西， 他们到达不了，也无法触及的',
    //   seeNum: '12',
    //   university: '广东金融学院',
    // },
    // {
    //   id: 2,
    //   proName: '组队系统',
    //   img: 'https://gw.alipayobjects.com/zos/rmsportal/HrxcVbrKnCJOZvtzSqjN.png',
    //   proDescribe: '那是一种内在的东西， 他们到达不了，也无法触及的',
    //   seeNum: '12',
    //   university: '广东金融学院',
    // },
  ];

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
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}
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
    // console.log('获取Token：', this.tokenService.get(JWTTokenModel).token);
    // console.log('获取用户信息：', this.tokenService.get(JWTTokenModel).userInfo);
    this.router$ = this.router.events.pipe(filter(e => e instanceof ActivationEnd)).subscribe(() => this.setActive());
    // this.setActive();
    // this.getData();
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
  }

  changeCategory(status: boolean, idx: number) {
    console.log(status);
    this.msg.success(`${idx}`);
    if (idx === 0) {
      this.categories.map(i => (i.value = status));
    } else {
      this.categories[idx].value = status;
    }
    // this.getDatas();
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

  getDatas(): void {
    // 获取用户基本信息
    this.user = this.tokenService.get(JWTTokenModel).userInfo;
    // 获取团队类型teamType
    this.dictionaryService.getTeamType().subscribe(datas => {
      this.teamType = datas.data;
      // console.log('teamtype:', this.teamType);
    });
    // 获取所有团队信息
    this.teamService.getTeams().subscribe(datas => {
      this.teams = datas.data.slice(0, 10);
    });
  }

  toTeamDetail() {}

  getMoreData() {
    this.msg.success('加载更多');
  }

  search(item?: any): Observable<Result> {
    this.msg.success('查找');
    console.log('temp:', this.messageService.data);
    return null;
  }
}
