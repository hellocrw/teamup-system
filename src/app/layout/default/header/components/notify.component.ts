import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { NzMessageService } from 'ng-zorro-antd';
import { NoticeItem, NoticeIconList } from '@delon/abc';
import { ApplyService } from 'src/app/services/apply/apply.service';
import { ApplyDto } from 'src/app/dto/ApplyDto';
import { NoticeService } from 'src/app/services/notice/notice.service';
import { CacheService } from '@delon/cache';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';

/**
 * 菜单通知
 */
@Component({
  selector: 'header-notify',
  template: `
    <notice-icon
      [data]="data"
      [count]="count"
      [loading]="loading"
      btnClass="alain-default__nav-item"
      btnIconClass="alain-default__nav-item-icon"
      (select)="select($event)"
      (clear)="clear($event)"
      (popoverVisibleChange)="loadDatas()"
    ></notice-icon>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderNotifyComponent implements OnInit {
  /**
   * 入队审批
   */
  enqueueInfo: ApplyDto[] = [];

  myApplyInfo: ApplyDto[] = [];

  noticeList: NoticeIconList[] = [];

  // notice: NoticeIconList = null;

  userId: string;

  data: NoticeItem[] = [
    {
      title: '公告通知',
      list: [],
      emptyText: '您已读完所有消息',
      clearText: '刷新',
    },
    {
      title: '入队审批',
      list: [],
      emptyText: '你已查看所有通知',
      clearText: '刷新',
    },
    {
      title: '我的申请',
      list: [],
      emptyText: '您已读完所有消息',
      clearText: '刷新',
    },
  ];
  count = 0;
  loading = false;

  constructor(
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private applyService: ApplyService,
    private noticeService: NoticeService,
    private cache: CacheService,
  ) {}

  /**
   * 生命钩子，初始化
   */
  ngOnInit(): void {
    this.cache.get<UserInfoDto>('userInfo').subscribe(f => (this.userId = f.userId));
    this.getDatas();
    // console.log('count:', this.count);
  }

  getDatas() {
    /**
     * 入队申请
     */
    this.applyService.getEnqueueApply(this.userId).subscribe(res => {
      this.enqueueInfo = res.data;
      console.log('enqueueInfo:', this.enqueueInfo);
      this.toNoticeIconList(this.enqueueInfo);
      this.count = this.count + this.enqueueInfo.length;
    });
    /**
     * 我的申请信息
     */
    this.applyService.getApplyByUserId(this.userId).subscribe(res => {
      this.myApplyInfo = res.data;
      // console.log('myApplyInfo:', this.myApplyInfo);
      // this.toNoticeIconList(this.myApplyInfo);
      this.toApplyList(this.myApplyInfo);
      this.count = this.count + this.myApplyInfo.length;
    });
  }

  toApplyList(item: ApplyDto[]): void {
    item.forEach(f => {
      this.noticeList.push(this.addApply(f));
    });
  }

  /**
   * 我的申请
   */
  addApply(f: ApplyDto): NoticeIconList {
    let applyList: NoticeIconList = null;
    applyList = this.initDatas();
    applyList.read = false;
    applyList.title = '我申请加入' + f.teamName;
    applyList.datetime = f.applyDate;
    applyList.type = '我的申请';
    return applyList;
  }

  /**
   * 将applyDto[]的值赋于NoticeIconList[]中
   */
  toNoticeIconList(item: ApplyDto[]): void {
    item.forEach(f => {
      this.noticeList.push(this.addItem(f));
    });
  }

  /**
   * 入队审批
   */
  addItem(f: ApplyDto): NoticeIconList {
    let noticeList: NoticeIconList = null;
    noticeList = this.initDatas();
    noticeList.read = false;
    noticeList.title = f.userName + '申请加入' + f.teamName;
    noticeList.datetime = f.applyDate;
    noticeList.type = '入队审批';
    console.log(noticeList);
    return noticeList;
  }

  loadDatas() {
    if (this.loading) return;
    this.loading = true;
    setTimeout(() => {
      this.updateNoticeData(this.noticeList);
      this.loading = false;
      // TODO
      this.cdr.detectChanges();
    }, 1000);
  }

  private updateNoticeData(noticeList: NoticeIconList[]): NoticeItem[] {
    const dataType = this.data.slice();
    dataType.forEach(i => (i.list = []));
    noticeList.forEach(item => {
      const newItem = { ...item };
      dataType.find(w => w.title === newItem.type)!.list.push(newItem);
      // dataType.find(w => w.title === '我的申请')!.list.push(newItem);
    });
    return dataType;
  }

  initDatas(item?: NoticeIconList): NoticeIconList {
    return {
      /** 标题 */
      title: item ? item.title : null,
      /** 描述信息 */
      description: item ? item.description : null,
      /** 时间戳 */
      datetime: item ? item.datetime : null,
      /** 是否已读状态 */
      read: item ? item.read : false,
    };
  }

  /**
   * 清空内容
   */
  clear(type: string) {
    this.msg.success(`清空了 ${type}`);
  }

  /**
   * 选择内容
   */
  select(res: any) {
    this.msg.success(`点击了 ${res.title} 的 ${res.item.title}`);
  }
}
