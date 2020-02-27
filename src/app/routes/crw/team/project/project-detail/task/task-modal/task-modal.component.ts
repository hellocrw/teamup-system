import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.less']
})
export class TaskModalComponent implements OnInit {

  // 是否显示对话框
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
