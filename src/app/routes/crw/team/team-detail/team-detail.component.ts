import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.less']
})
export class TeamDetailComponent implements OnInit {

  team: any;
  // prjects: any[] = [];
  teamId: string;

  constructor(private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('teamId');
    this.getDatas();
  }

  getDatas(): void {
    // 获取对应的团队信息以及项目信息
    this.teamService.getTeamProByTeamId(this.teamId).subscribe(datas => {
      this.team = datas.data;
      console.log('team:', this.team);
    })
  }

  /**
   * 跳转到项目详情页面
   */
  toProDetail(proId: string): void {
    this.router.navigateByUrl(`team/project/project-detail/${proId}`);
  }


}
