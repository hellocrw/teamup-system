import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.less']
})
export class TeamDetailComponent implements OnInit {

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.testService.getTeamDetail().subscribe(datas => {
      console.log('datas:', datas);
    })
  }

}
