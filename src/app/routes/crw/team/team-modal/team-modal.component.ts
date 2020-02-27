import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.less']
})
export class TeamModalComponent implements OnInit {

  isVisible = false;

  constructor() { }

  ngOnInit() {
  }

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
