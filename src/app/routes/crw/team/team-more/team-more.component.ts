import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team/team.service';
import { TeamDto } from 'src/app/dto/TeamDto';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { PageRequest } from 'src/app/dto/PageRequest';
import { PageResult } from 'src/app/dto/PageResult';

@Component({
  selector: 'app-team-more',
  templateUrl: './team-more.component.html',
  styleUrls: ['./team-more.component.less'],
})
export class TeamMoreComponent implements OnInit {
  teams: TeamDto[] = [];
  pageTeams: PageResult<TeamDto[]> = null;
  /**
   * 当前页码
   */
  pageNum = '1';
  /**
   * 每页数量
   */
  pageSize = '3';

  pageRequest: PageRequest;

  constructor(private teamService: TeamService, private msg: NzMessageService, private route: Router) {}

  ngOnInit() {
    this.pageRequest = this.initpageRequest();
    this.pageTeams = this.initPageResult();
    this.getDatas();
  }

  initpageRequest(item?: PageRequest): PageRequest {
    return {
      pageNum: item ? item.pageNum : null,
      pageSize: item ? item.pageSize : null,
    };
  }

  initPageResult(item?: PageResult<TeamDto[]>): PageResult<TeamDto[]> {
    return {
      pageNum: item ? item.pageNum : null,
      pageSize: item ? item.pageSize : null,
      totalSize: item ? item.totalSize : null,
      totalPages: item ? item.totalPages : null,
      content: item ? item.content : null,
    };
  }

  getDatas(): void {
    // 获取团队数据
    this.teamService.getTeams().subscribe(res => {
      this.teams = res.data;
      console.log('teams:', this.teams);
    });
    this.pageRequest.pageNum = this.pageNum;
    console.log(this.pageNum);
    this.pageRequest.pageSize = this.pageSize;
    console.log(this.pageSize);
    // 分页查询团队数据
    this.teamService.getTeamByPage(this.pageRequest).subscribe(res => {
      this.pageTeams = res.data;
      console.log('pageTeams', this.pageTeams);
    });
  }

  toApply(teamId: string): void {
    this.msg.success(teamId);
    this.route.navigateByUrl(`/team/team-apply-view/${teamId}`);
  }
}
