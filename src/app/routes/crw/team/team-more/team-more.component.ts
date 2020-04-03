import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team/team.service';
import { TeamDto } from 'src/app/dto/TeamDto';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-more',
  templateUrl: './team-more.component.html',
  styleUrls: ['./team-more.component.less'],
})
export class TeamMoreComponent implements OnInit {
  teams: TeamDto[] = [];

  constructor(private teamService: TeamService, private msg: NzMessageService, private route: Router) {}

  ngOnInit() {
    this.getDatas();
  }

  getDatas(): void {
    this.teamService.getTeams().subscribe(res => {
      this.teams = res.data;
      console.log('teams:', this.teams);
    });
  }

  toApply(teamId: string): void {
    this.msg.success(teamId);
    this.route.navigateByUrl(`/team/team-apply-view/${teamId}`);
  }
}
