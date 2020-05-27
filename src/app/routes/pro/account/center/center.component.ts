import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { zip, Subscription } from 'rxjs';
import { CacheService } from '@delon/cache';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { TeamService } from 'src/app/services/team/team.service';
import { TeamDto } from 'src/app/dto/TeamDto';

@Component({
  selector: 'app-account-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProAccountCenterComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private cache: CacheService,
    private teamService: TeamService,
  ) {}
  private router$: Subscription;

  userInfo: UserInfoDto;

  myTeams: TeamDto[];

  joinTeams: TeamDto[];

  user: any;

  notice: any;
  tabs: any[] = [
    {
      key: 'articles',
      tab: '文章 (8)',
    },
    {
      key: 'applications',
      tab: '应用 (8)',
    },
    {
      key: 'projects',
      tab: '项目 (8)',
    },
  ];

  pos = 0;

  taging = false;
  tagValue = '';
  @ViewChild('tagInput', { static: false })
  private tagInput: ElementRef;

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    const idx = this.tabs.findIndex(w => w.key === key);
    if (idx !== -1) this.pos = idx;
  }

  ngOnInit(): void {
    this.cache.get<UserInfoDto>('userInfo').subscribe(data => {
      this.userInfo = data;
      console.log(this.userInfo);
    });
    // zip(this.http.get('/user/current'), this.http.get('/api/notice')).subscribe(([user, notice]) => {
    //   this.user = user;
    //   this.notice = notice;
    //   this.cdr.detectChanges();
    // });
    this.router$ = this.router.events.pipe(filter(e => e instanceof ActivationEnd)).subscribe(() => this.setActive());
    this.setActive();
    this.getDatas();
  }

  getDatas(): void {
    // 获取我创建的团队
    this.teamService.getMyTeamProByUserId(this.userInfo.userId).subscribe(res => {
      this.myTeams = res.data;
      // console.log('teams111:', this.myTeams);
    });
    // 获取我参与的团队
    this.teamService.getJoinTeamProByUserId(this.userInfo.userId).subscribe(res => {
      this.joinTeams = res.data;
    });
  }

  to(item: any) {
    this.router.navigateByUrl(`/pro/account/center/${item.key}`);
  }
  tagShowIpt() {
    this.taging = true;
    this.cdr.detectChanges();
    (this.tagInput.nativeElement as HTMLInputElement).focus();
  }

  tagBlur() {
    const { user, cdr, tagValue } = this;
    if (tagValue && user.tags.filter(tag => tag.label === tagValue).length === 0) {
      user.tags.push({ label: tagValue });
    }
    this.tagValue = '';
    this.taging = false;
    cdr.detectChanges();
  }

  tagEnter(e: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    if (e.keyCode === 13) this.tagBlur();
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }
}
