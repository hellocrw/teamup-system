import { Component, OnInit } from '@angular/core';
import { TeamDto } from 'src/app/dto/TeamDto';
import { NzMessageService } from 'ng-zorro-antd';
import { CacheService } from '@delon/cache';
import { TeamService } from 'src/app/services/team/team.service';
import { Result } from 'src/app/dto/Result';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamTypeDto } from 'src/app/dto/TeamTypeDto';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { UserTeamDto } from 'src/app/dto/UserTeamDto';
import { UserTeamService } from 'src/app/services/user-team/user-team.service';

@Component({
  selector: 'app-new-team-modal',
  providers: [DatePipe],
  template: `
    <nz-modal
      [nzMaskClosable]="false"
      [nzWidth]="800"
      [(nzVisible)]="isVisible"
      nzTitle="填写组队基本信息"
      (nzOnCancel)="handleCancel()"
      (nzOnOk)="handleOk(teamInfo.value)"
      [nzBodyStyle]="{
        'max-height': '455px',
        'min-height': '300px',
        'overflow-y': 'auto',
        'overflow-x': 'hidden',
        padding: '24px 24px 0 24px'
      }"
    >
      <form #teamInfo="ngForm" nz-form>
        <nz-form-item nzGutter="24">
          <nz-form-label [nzSpan]="4" nzRequired>管理员ID</nz-form-label>
          <nz-form-control [nzSpan]="18">
            <input
              nz-input
              placeholder="填3则无需管理员，直接组队成功"
              name="adminId"
              [(ngModel)]="item.adminId"
              #adminId="ngModel"
              type="number"
              required
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item nzGutter="24">
          <nz-form-label [nzSpan]="4" nzRequired>团队名称</nz-form-label>
          <nz-form-control [nzSpan]="7">
            <input nz-input name="teamName" [(ngModel)]="item.teamName" #teamName="ngModel" required />
          </nz-form-control>
          <nz-form-label [nzSpan]="4" nzFor="teamNumber" nzRequired>团队人数</nz-form-label>
          <nz-form-control [nzSpan]="7">
            <input nz-input name="teamNumber" [(ngModel)]="item.teamNumber" type="number" required />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item nzGutter="24">
          <nz-form-label [nzSpan]="4" nzFor="teamType" nzRequired>团队类型</nz-form-label>
          <nz-form-control [nzSpan]="7">
            <nz-select
              name="teamType"
              [(ngModel)]="item.teamType"
              name="teamType"
              nzPlaceHolder=""
              nzAllowClear
              required
            >
              <nz-option *ngFor="let item of teamType; let idx = index" #value [nzLabel]="item.value" [nzValue]="idx">
              </nz-option>
            </nz-select>
          </nz-form-control>
          <nz-form-label [nzSpan]="4" nzFor="teamScope" nzRequired>团队范围</nz-form-label>
          <nz-form-control [nzSpan]="7">
            <nz-select
              #teamScope="ngModel"
              [(ngModel)]="item.teamScope"
              name="teamScope"
              nzPlaceHolder=""
              nzAllowClear
              required
            >
              <nz-option nzLabel="校内" nzValue="校内"> </nz-option>
              <nz-option nzLabel="校外" nzValue="校外"> </nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item nzGutter="24">
          <nz-form-label [nzSpan]="4" nzFor="teamNature" nzRequired>团队性质</nz-form-label>
          <nz-form-control [nzSpan]="7">
            <input nz-input name="teamNature" [(ngModel)]="item.teamNature" #teamNature="ngModel" required />
          </nz-form-control>
          <nz-form-label [nzSpan]="4" nzFor="teamLabel" nzRequired>团队标签</nz-form-label>
          <nz-form-control [nzSpan]="7">
            <input nz-input #teamLabel="ngModel" [(ngModel)]="item.teamLabel" name="teamLabel" required />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="4" [nzXs]="24" nzFor="teamDescribe" nzRequired>团队描述</nz-form-label>
          <nz-form-control [nzSm]="18" [nzXs]="24">
            <textarea
              #teamDescribe
              [(ngModel)]="item.teamDescribe"
              name="teamDescribe"
              rows="4"
              name="teamDescribe"
              nz-input
            ></textarea>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="4" [nzXs]="24" nzFor="staff" nzRequired>需要人员类型</nz-form-label>
          <nz-form-control [nzSm]="18" [nzXs]="24">
            <textarea rows="4" name="staff" [(ngModel)]="item.staff" #staff="ngModel" name="staff" nz-input></textarea>
          </nz-form-control>
        </nz-form-item>
      </form>
    </nz-modal>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTeamModalComponent implements OnInit {
  isVisible = false;

  userInfo: UserInfoDto = null;

  item: TeamDto = null;

  res: Result;
  // 团队类型
  teamType: TeamTypeDto[] = [];

  constructor(
    private msg: NzMessageService,
    private cache: CacheService,
    private teamService: TeamService,
    private datePipe: DatePipe,
    private route: Router,
    private userTeamService: UserTeamService,
  ) {}

  ngOnInit() {
    this.item = this.initFormData();
    this.cache.get<UserInfoDto>('userInfo').subscribe(f => (this.userInfo = f));
    // 获取缓存中的团队类型
    this.cache.get<TeamTypeDto[]>('teamType').subscribe(f => (this.teamType = f));
  }

  addTeam(value: TeamDto): void {
    console.log('xxxx');
    console.log(value);
  }

  /**
   * 取消
   */
  handleCancel() {
    console.log();
    this.isVisible = false;
  }

  /**
   * 确认,创建团队
   */
  handleOk(value: TeamDto) {
    this.save(value);
    this.isVisible = false;
    // this.route.navigateByUrl('/team');
  }

  /**
   * 保存数据
   */
  save(team: TeamDto) {
    // 保存团队信息
    if (team.adminId == null) {
      team.adminId = '0';
    }
    this.item = team;
    if (team.teamScope === '校内') {
      this.item.teamScope = this.userInfo.university;
    }
    this.item.status = '0';
    this.item.seeNum = '0';
    this.item.leaderId = this.userInfo.userId;
    this.item.leaderName = this.userInfo.userName;
    this.item.teamDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.teamService.saveTeam(this.item).subscribe(data => {
      this.res = data;
      this.msg.success(data.desc);
    });
  }

  /**
   * 初始化数据
   */
  initFormData(item?: TeamDto): TeamDto {
    return {
      teamId: item ? item.teamId : null,
      teamName: item ? item.teamName : null,
      adminId: item ? item.adminId : null,
      leaderId: item ? item.leaderId : null,
      leaderName: item ? item.leaderName : null,
      teamDescribe: item ? item.teamDescribe : null,
      teamType: item ? item.teamType : null,
      teamScope: item ? item.teamScope : null,
      teamNumber: item ? item.teamNumber : null,
      teamDate: item ? item.teamDate : null,
      status: item ? item.status : null,
      staff: item ? item.staff : null,
      teamNature: item ? item.teamNature : null,
      teamLabel: item ? item.teamLabel : null,
      seeNum: item ? item.seeNum : null,
    };
  }

  initUserTeamData(item?: UserTeamDto): UserTeamDto {
    return {
      utId: item ? item.utId : null,
      userId: item ? item.userId : null,
      userName: item ? item.userName : null,
      teamId: item ? item.teamId : null,
      teamName: item ? item.teamName : null,
      isLeader: item ? item.isLeader : null,
    };
  }
}
