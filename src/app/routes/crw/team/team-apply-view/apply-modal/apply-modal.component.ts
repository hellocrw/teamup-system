import { Component, OnInit, Input } from '@angular/core';
import { ApplyDto } from 'src/app/dto/ApplyDto';
import { NzMessageService } from 'ng-zorro-antd';
import { ApplyService } from 'src/app/services/apply/apply.service';
import { TeamDto } from 'src/app/dto/TeamDto';
import { CacheService } from '@delon/cache';
import { Result } from 'src/app/dto/Result';
import { TeamService } from 'src/app/services/team/team.service';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';

@Component({
  selector: 'app-apply-modal',
  templateUrl: './apply-modal.component.html',
  styleUrls: ['./apply-modal.component.less'],
})
export class ApplyModalComponent implements OnInit {
  isVisible = false;

  applyInfo: ApplyDto = null;

  userInfo: UserInfoDto;

  @Input() teamInfo: TeamDto;

  result: Result;

  constructor(
    private msg: NzMessageService,
    private applyService: ApplyService,
    private cache: CacheService,
    private teamService: TeamService,
  ) {}

  ngOnInit() {
    console.log('modal的初始化');
    this.applyInfo = this.initFormDatas();
    this.cache.get<UserInfoDto>('userInfo').subscribe(f => (this.userInfo = f));
    this.teamService.getTeamProByTeamId(this.userInfo.userId).subscribe(res => {
      this.teamInfo = res.data;
      console.log('team:', this.teamInfo);
    });
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
    this.applyInfo = projectInfo;
    this.applyInfo.userId = this.userInfo.userId;
    this.applyInfo.teamId = this.teamInfo.teamId;
    this.applyInfo.teamName = this.teamInfo.teamName;
    this.applyInfo.status = '0';
    this.applyInfo.applyDate = '2020-02-02';
    console.log('填写信息：', this.applyInfo);
    this.applyService.create(this.applyInfo).subscribe(res => (this.result = res));
    this.msg.success('申请成功');
    this.isVisible = false;
  }
}
