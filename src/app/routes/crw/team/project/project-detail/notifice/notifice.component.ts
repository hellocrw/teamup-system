import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { NoticeService } from 'src/app/services/notice/notice.service';
import { NoticeDto } from 'src/app/dto/NoticeDto';
import { MessageService } from 'src/app/services/message/message.service';
import { _HttpClient } from '@delon/theme';
import { zip } from 'rxjs';
import { NoticeIconComponent } from '@delon/abc';
import { NotificeModalComponent } from './notifice-modal/notifice-modal.component';

@Component({
  selector: 'app-notifice',
  templateUrl: './notifice.component.html',
  styleUrls: ['./notifice.component.less'],
})
export class NotificeComponent implements OnInit {
  proId: string;

  activities: any[] = [];

  radarData: any[];

  notice: any[] = [];

  loading = true;

  noticeInfo: NoticeDto[] = null;

  @ViewChild('notificeModelComponent', { static: true })
  notificeModelComponent: NotificeModalComponent;

  constructor(
    public msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private noticeService: NoticeService,
    private messageService: MessageService,
    private http: _HttpClient,
  ) {}

  ngOnInit() {
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
    this.proId = this.messageService.data;
    // this.noticeInfo = this.initDatas();
    console.log('notice:', this.messageService.data);
    this.getDatas();
  }

  getDatas(): void {
    this.noticeService.getNoticesByProId(this.proId).subscribe(res => {
      this.noticeInfo = res.data;
      console.log('notice:', this.noticeInfo);
    });
  }

  initDatas(item?: NoticeDto): NoticeDto {
    return {
      noticeId: item ? item.noticeId : null,
      userId: item ? item.userId : null,
      userName: item ? item.userName : null,
      proId: item ? item.proId : null,
      noticeContent: item ? item.noticeContent : null,
    };
  }

  create() {
    // this.msg.success('新增公告');
    this.notificeModelComponent.isVisible = true;
  }
}
