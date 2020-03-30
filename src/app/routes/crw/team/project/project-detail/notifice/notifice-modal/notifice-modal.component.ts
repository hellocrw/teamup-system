import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifice-modal',
  templateUrl: './notifice-modal.component.html',
  styleUrls: ['./notifice-modal.component.less'],
})
export class NotificeModalComponent implements OnInit {
  // 是否显示对话框
  isVisible = false;

  constructor() {}

  ngOnInit() {}

  /**
   * 取消
   */
  handleCancel() {
    this.isVisible = false;
  }

  /**
   * 确定
   */
  handleOk() {
    this.isVisible = false;
  }
}
