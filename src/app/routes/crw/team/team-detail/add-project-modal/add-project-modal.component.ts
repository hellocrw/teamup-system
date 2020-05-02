import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamDto } from 'src/app/dto/TeamDto';
import { ProjectDto } from 'src/app/dto/projectDto';
import { Result } from 'src/app/dto/Result';
import { NzMessageService } from 'ng-zorro-antd';
import { ProjectService } from 'src/app/services/project/project.service';
import { DatePipe } from '@angular/common';
import { TeamService } from 'src/app/services/team/team.service';
import { CacheService } from '@delon/cache';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.less'],
  providers: [DatePipe],
})
export class AddProjectModalComponent implements OnInit {
  isVisible = false;

  userId: string;

  userInfo: UserInfoDto;

  myTeams: TeamDto[];

  @Input() team: TeamDto;

  item: ProjectDto;

  i: any = {};

  res: Result;

  operationTime: Array<Date> = [];

  @Output()
  protected event: EventEmitter<ProjectDto> = new EventEmitter();

  constructor(
    private msg: NzMessageService,
    private projectService: ProjectService,
    private datePipe: DatePipe,
    private teamService: TeamService,
    private cache: CacheService,
  ) {}

  ngOnInit() {
    this.cache.get<UserInfoDto>('userInfo').subscribe(f => {
      this.userInfo = f;
      this.userId = f.userId;
    });
    this.item = this.initFormData();
    this.getDatas();
  }

  getDatas(): void {
    // 查询我创建的团队
    this.teamService.getMyTeamProByUserId(this.userId).subscribe(res => {
      this.myTeams = res.data;
      console.log('myteam', this.myTeams);
    });
  }

  /**
   * 初始化表单数据
   */
  initFormData(item?: ProjectDto): ProjectDto {
    return {
      proId: item ? item.proId : null,
      proName: item ? item.proName : null,
      leaderName: item ? item.leaderName : null,
      proDescribe: item ? item.proDescribe : null,
      proDate: item ? item.proDate : null,
      proStartTime: item ? item.proStartTime : null,
      proEndTime: item ? item.proEndTime : null,
      proStatus: item ? item.proStatus : null,
      teamId: item ? item.teamId : null,
      proType: item ? item.proType : null,
      proCurrentNum: item ? item.proCurrentNum : null,
      proLimiedNum: item ? item.proLimiedNum : null,
      seeNum: item ? item.seeNum : null,
      staff: item ? item.staff : null,
      staffList: item ? item.staffList : null,
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
  handleOk(value) {
    if (this.item.proId === null) {
      this.item.teamId = this.team.teamId;
      this.item.leaderName = this.userInfo.userName;
      this.item.proStatus = '0';
      this.item.seeNum = '0';
      // // 通过选择的团队 --> 查询团队信息
      // const team: TeamDto = null;
      this.item.leaderName = this.item.proDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.item.proStartTime = this.datePipe.transform(this.operationTime[0], 'yyyy-MM-dd');
      this.item.proEndTime = this.datePipe.transform(this.operationTime[1], 'yyyy-MM-dd');
      console.log('value:', value);
      console.log('dateTime:', this.operationTime);
      this.projectService.saveProject(this.item).subscribe(data => {
        this.res = data;
        this.event.emit(this.res.data);
      });
      this.msg.success('新建项目成功');
      // this.event.emit(this.item);
      this.isVisible = false;
    } else {
      this.projectService.update(this.item.proId, this.item).subscribe();
      this.msg.success('修改项目成功');
      this.isVisible = false;
    }
  }

  selectTeam(teamId: string) {
    console.log('select: ', teamId);
  }
}
