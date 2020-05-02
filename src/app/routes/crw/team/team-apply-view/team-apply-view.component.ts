import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplyModalComponent } from './apply-modal/apply-modal.component';
import { TeamService } from 'src/app/services/team/team.service';
import { NzMessageService } from 'ng-zorro-antd';
import { TeamDto } from 'src/app/dto/TeamDto';
import { ActivatedRoute } from '@angular/router';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';

@Component({
  selector: 'app-team-apply-view',
  templateUrl: './team-apply-view.component.html',
  styleUrls: ['./team-apply-view.component.less'],
})
export class TeamApplyViewComponent implements OnInit {
  array = [1, 2, 3, 4];

  @ViewChild('applyModalComponent', { static: true })
  applyModalComponent: ApplyModalComponent;

  constructor(
    private teamService: TeamService,
    private msg: NzMessageService,
    private route: ActivatedRoute,
    private userInfoService: UserInfoService,
  ) {}

  teamId: string;

  teamInfo: TeamDto = null;

  userInfo: UserInfoDto = null;

  ngOnInit() {
    console.log('view 的初始化');
    this.teamId = this.route.snapshot.paramMap.get('teamId');
    this.getDatas();
    // this.msg.success(JSON.stringify(this.teamInfo));
  }

  getDatas(): void {
    this.teamInfo = this.initDatas();
    this.userInfo = this.initUserData();
    this.teamService.getTeamProByTeamId(this.teamId).subscribe(res => {
      this.teamInfo = res.data;
      console.log('teamInfo:', this.teamInfo);
      this.applyModalComponent.teamInfo = this.teamInfo;
    });
    // 获取队长信息
    this.userInfoService.getLeaderByTeamId(this.teamId).subscribe(res => {
      this.userInfo = res.data;
    });
  }

  initDatas(item?: TeamDto): TeamDto {
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

  initUserData(item?: UserInfoDto): UserInfoDto {
    return {
      userId: item ? item.userId : null,
      userName: item ? item.userName : null,
      userAvatar: item ? item.userAvatar : null,
      gender: item ? item.gender : null,
      university: item ? item.university : null,
      college: item ? item.college : null,
      profession: item ? item.profession : null,
      grade: item ? item.grade : null,
      userClass: item ? item.userClass : null,
      userNo: item ? item.userNo : null,
      userTel: item ? item.userTel : null,
      email: item ? item.email : null,
      ability: item ? item.ability : null,
    };
  }

  /**
   * 申请入队
   */
  apply(event: any) {
    console.log('申请入队');
    this.applyModalComponent.isVisible = true;
    this.applyModalComponent.teamInfo = this.teamInfo;
  }
}
