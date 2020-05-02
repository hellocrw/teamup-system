import { Component, OnInit } from '@angular/core';
import { TeamDto } from 'src/app/dto/TeamDto';

@Component({
  selector: 'app-send-messagement',
  templateUrl: './send-messagement.component.html',
  styleUrls: ['./send-messagement.component.less'],
})
export class SendMessagementComponent implements OnInit {
  isVisible = false;

  team: TeamDto;

  constructor() {}

  ngOnInit() {}

  /**
   * 确定
   */
  handleCancel() {
    this.isVisible = false;
  }

  /**
   * 取消
   */
  handleOk() {
    this.isVisible = false;
  }
}
