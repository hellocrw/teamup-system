import { Component, OnInit, Input } from '@angular/core';
import { ApplyDto } from 'src/app/dto/ApplyDto';
import { NzMessageService } from 'ng-zorro-antd';
import { ApplyService } from 'src/app/services/apply/apply.service';
import { TeamDto } from 'src/app/dto/TeamDto';
import { CacheService } from '@delon/cache';
import { Result } from 'src/app/dto/Result';

@Component({
  selector: 'app-apply-modal',
  templateUrl: './apply-modal.component.html',
  styleUrls: ['./apply-modal.component.less'],
})
export class ApplyModalComponent implements OnInit {
  isVisible = false;

  applyInfo: ApplyDto = null;

  userInfo: any;

  teamInfo: TeamDto;

  result: Result;

  constructor(private msg: NzMessageService, private applyService: ApplyService, private cache: CacheService) {}

  ngOnInit() {
    this.applyInfo = this.initFormDatas();
    this.cache.get('userInfo').subscribe(f => (this.userInfo = f));
    console.log('team:', this.teamInfo);
  }

  initFormDatas(item?: ApplyDto): ApplyDto {
    return {
      applyId: item ? item.applyId : null,
      teamId: item ? item.teamId : null,
      teamName: item ? item.teamName : null,
      userId: item ? item.userId : null,
      userName: item ? item.userName : null,
      applyDate: item ? item.applyDate : null,
      decribe: item ? item.decribe : null,
      phone: item ? item.phone : null,
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
   * 确定
   */
  handleOk(projectInfo: ApplyDto) {
    this.applyInfo.userId = this.userInfo.userId;
    this.applyInfo.teamId = '1';
    this.applyInfo.teamName = '废铁团队';
    this.applyInfo.status = '0';
    this.applyInfo.applyDate = '2020-02-02';
    this.applyService.create(projectInfo).subscribe(res => (this.result = res));
    this.msg.success(JSON.stringify(projectInfo));
    this.isVisible = false;
  }
}
