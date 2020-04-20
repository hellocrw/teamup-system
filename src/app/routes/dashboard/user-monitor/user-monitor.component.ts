import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { TeamTypeService } from 'src/app/services/team-type/team-type.service';

@Component({
  selector: 'app-user-monitor',
  templateUrl: './user-monitor.component.html',
  styleUrls: ['./user-monitor.component.less'],
})
export class UserMonitorComponent implements OnInit {
  salesPieData = [
    // {
    //   x: '技术类',
    //   y: 10,
    // },
    // {
    //   x: '金融类',
    //   y: 12,
    // },
  ];
  total: string;
  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private teamTypeService: TeamTypeService,
  ) {}

  ngOnInit() {
    this.getDatas();
  }

  getDatas(): void {
    this.teamTypeService.getUserAnalysis().subscribe(res => {
      this.salesPieData = res.data;
      this.total = `${this.salesPieData.reduce((pre, now) => now.y + pre, 0)}`;
    });
  }
}
