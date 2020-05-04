import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
  AfterContentChecked,
  OnChanges,
} from '@angular/core';
import { TeamDto } from 'src/app/dto/TeamDto';
import { ProjectDto } from 'src/app/dto/projectDto';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { NoticeDto } from 'src/app/dto/NoticeDto';
import { CacheService } from '@delon/cache';
import { NoticeService } from 'src/app/services/notice/notice.service';
import { DatePipe } from '@angular/common';
import { ProjectService } from 'src/app/services/project/project.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-send-messagement',
  templateUrl: './send-messagement.component.html',
  styleUrls: ['./send-messagement.component.less'],
  providers: [DatePipe],
})
export class SendMessagementComponent implements OnInit, AfterContentInit, OnChanges {
  team: TeamDto = {};

  // 是否显示对话框
  isVisible = false;

  project: ProjectDto = null;

  proId: string;

  userInfo: UserInfoDto = null;

  notice: NoticeDto = null;

  selectedValue: string;

  constructor(
    private cache: CacheService,
    private noticeService: NoticeService,
    private datePipe: DatePipe,
    private projectService: ProjectService,
    private msg: NzMessageService,
  ) {}

  ngOnInit() {
    this.notice = this.initNotice();
    this.cache.get<UserInfoDto>('userInfo').subscribe(userInfo => {
      this.userInfo = userInfo;
    });
    console.log('团队：', this.team);
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
    data.proId = this.selectedValue;
    this.team.projects.forEach(project => {
      if (project.proId === this.selectedValue) {
        data.proName = project.proName;
      }
    });
    data.createTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    data.status = '0';
    this.noticeService.save(data).subscribe();
    this.msg.success('通知成功');
    this.isVisible = false;
  }

  ngAfterContentInit(): void {
    console.log('子组件');
  }

  ngOnChanges(): void {
    console.log('子组件1');
  }
}
