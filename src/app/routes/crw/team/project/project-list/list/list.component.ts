import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListComponent implements OnInit {
  constructor(private msg: NzMessageService) {}

  ngOnInit() {}

  delete(item) {
    console.log('删除');
  }

  to(teamId: string): void {
    this.msg.success(teamId);
  }
}
