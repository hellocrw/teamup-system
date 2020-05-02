import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NoticeDto } from 'src/app/dto/NoticeDto';
import { CacheService } from '@delon/cache';
import { NoticeService } from 'src/app/services/notice/notice.service';
import { DatePipe } from '@angular/common';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { ProjectDto } from 'src/app/dto/projectDto';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-notifice-modal',
  templateUrl: './notifice-modal.component.html',
  styleUrls: ['./notifice-modal.component.less'],
  providers: [DatePipe],
})
export class NotificeModalComponent implements OnInit {
  // 是否显示对话框
  isVisible = false;

  project: ProjectDto = null;

  @Input() proId: string;

  userInfo: UserInfoDto = null;

  notice: NoticeDto = null;

  @Output() element = new EventEmitter<NoticeDto>();

  constructor(
    private cache: CacheService,
    private noticeService: NoticeService,
    private datePipe: DatePipe,
    private projectService: ProjectService,
  ) {}

  ngOnInit() {
    console.log('myproId: ', this.proId);
    this.cache.get<UserInfoDto>('userInfo').subscribe(f => (this.userInfo = f));
    this.notice = this.initNotice();
    this.projectService.getProjectByProId(this.proId).subscribe(res => {
      this.project = res.data;
    });
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
    data.proId = this.project.proId;
    data.proName = this.project.proName;
    data.createTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    data.status = '0';
    this.noticeService.save(data).subscribe();
    this.element.emit(data);
    this.isVisible = false;
  }
}
