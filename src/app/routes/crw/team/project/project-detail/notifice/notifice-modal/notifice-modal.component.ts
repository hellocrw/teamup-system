import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NoticeDto } from 'src/app/dto/NoticeDto';
import { CacheService } from '@delon/cache';
import { NoticeService } from 'src/app/services/notice/notice.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notifice-modal',
  templateUrl: './notifice-modal.component.html',
  styleUrls: ['./notifice-modal.component.less'],
  providers: [DatePipe],
})
export class NotificeModalComponent implements OnInit {
  // 是否显示对话框
  isVisible = false;

  userInfo: any;

  notice: NoticeDto = null;

  @Output() element = new EventEmitter<NoticeDto>();

  constructor(private cache: CacheService, private noticeService: NoticeService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.cache.get('userInfo').subscribe(f => (this.userInfo = f));
    this.notice = this.initNotice();
  }

  /**
   * 初始化数据
   */
  initNotice(item?: NoticeDto): NoticeDto {
    return {
      noticeId: item ? item.noticeId : null,
      userId: item ? item.userId : null,
      userName: item ? item.userName : null,
      proId: item ? item.proId : null,
      proName: item ? item.proName : null,
      noticeContent: item ? item.noticeContent : null,
      createTime: item ? item.createTime : null,
      status: item ? item.status : null,
    };
  }

  /**
   * 取消
   */
  handleCancel() {
    this.isVisible = false;
  }

  /**
   * 确定,保存公告信息
   */
  handleOk(data: NoticeDto) {
    console.log('data:', data);
    data.userId = this.userInfo.userId;
    data.userName = this.userInfo.userName;
    data.proId = '1';
    data.proName = 'ceshi';
    data.createTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    data.status = '0';
    this.noticeService.save(data).subscribe();
    this.element.emit(data);
    this.isVisible = false;
  }
}
