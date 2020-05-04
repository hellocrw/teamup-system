import { Component, OnInit } from '@angular/core';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { TeamDto } from 'src/app/dto/TeamDto';
import { Result } from 'src/app/dto/Result';
import { TeamTypeDto } from 'src/app/dto/TeamTypeDto';
import { NzMessageService } from 'ng-zorro-antd';
import { CacheService } from '@delon/cache';
import { TeamService } from 'src/app/services/team/team.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { UserTeamService } from 'src/app/services/user-team/user-team.service';
import { UserTeamDto } from 'src/app/dto/UserTeamDto';

@Component({
  selector: 'app-team-edit-modal',
  templateUrl: './team-edit-modal.component.html',
  styleUrls: ['./team-edit-modal.component.less'],
  providers: [DatePipe],
})
export class TeamEditModalComponent implements OnInit {
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
      sumNumber: item ? item.sumNumber : null,
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
