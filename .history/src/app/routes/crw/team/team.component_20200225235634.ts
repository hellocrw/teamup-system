import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { Router, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TestService } from 'src/app/services/test.service';
import { LoginInfo } from 'src/app/dto/LoginInfo';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.less']
})
export class TeamComponent implements OnInit {

  constructor(private router: Router,
    private http: _HttpClient,
    public msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private testService: TestService) { }
  q: any = {
    ps: 8,
    categories: [],
    owners: ['zxx'],
  };

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
    {
      id: 1,
      proName: "组队系统",
      img: "https://gw.alipayobjects.com/zos/rmsportal/HrxcVbrKnCJOZvtzSqjN.png",
      proDescribe: "那是一种内在的东西， 他们到达不了，也无法触及的",
      seeNum: "12",
      university: "广东金融学院"
    },
    {
      id: 2,
      proName: "组队系统",
      img: "https://gw.alipayobjects.com/zos/rmsportal/HrxcVbrKnCJOZvtzSqjN.png",
      proDescribe: "那是一种内在的东西， 他们到达不了，也无法触及的",
      seeNum: "12",
      university: "广东金融学院"
    },
  ];

  loading = true;

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
  loginInfo = {
    userName: 'admin',
    password: '123456',
  };

  changeCategory(status: boolean, idx: number) {
    if (idx === 0) {
      this.categories.map(i => (i.value = status));
    } else {
      this.categories[idx].value = status;
    }
    this.getData();
  }

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    const idx = this.tabs.findIndex(w => w.key === key);
    if (idx !== -1) {
      this.pos = idx;
    }
  }

  ngOnInit(): void {
    this.router$ = this.router.events.pipe(filter(e => e instanceof ActivationEnd)).subscribe(() => this.setActive());
    this.setActive();
    // this.getData();
    this.testService.login(this.loginInfo);
  }

  to(item: any) {
    this.router.navigateByUrl(`/pro/list/${item.key}`);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.router$.unsubscribe();
  }

  getData() {
    this.loading = true;
    this.http.get('/api/list', { count: this.q.ps }).subscribe((res: any) => {
      this.proList = this.proList.concat(res);
      this.loading = false;
      this.cdr.detectChanges();
    });
  }
  toTeamDetail() {

  }
}
