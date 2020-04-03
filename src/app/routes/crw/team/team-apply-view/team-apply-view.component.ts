import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplyModalComponent } from './apply-modal/apply-modal.component';
import { TeamService } from 'src/app/services/team/team.service';
import { NzMessageService } from 'ng-zorro-antd';
import { TeamDto } from 'src/app/dto/TeamDto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-apply-view',
  templateUrl: './team-apply-view.component.html',
  styleUrls: ['./team-apply-view.component.less'],
})
export class TeamApplyViewComponent implements OnInit {
  array = [1, 2, 3, 4];

  @ViewChild('applyModalComponent', { static: true })
  applyModalComponent: ApplyModalComponent;

  constructor(private teamService: TeamService, private msg: NzMessageService, private route: ActivatedRoute) {}

  teamId: string;

  teamInfo: TeamDto = null;

  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('teamId');
    this.getDatas();
    // this.msg.success(JSON.stringify(this.teamInfo));
  }

  getDatas(): void {
    this.teamInfo = this.initDatas();
    this.teamService.getTeamProByTeamId(this.teamId).subscribe(res => {
      this.teamInfo = res.data;
      console.log('teamInfo:', this.teamInfo);
      this.applyModalComponent.teamInfo = this.teamInfo;
    });
  }

  initDatas(item?: TeamDto): TeamDto {
    return {
      teamId: item ? item.teamId : null,
      teamName: item ? item.teamName : null,
      leaderId: item ? item.leaderId : null,
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

  apply(event: any) {
    console.log('申请入队');
    this.applyModalComponent.isVisible = true;
  }
}
