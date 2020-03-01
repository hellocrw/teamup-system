import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.less']
})
export class TaskDetailComponent implements OnInit {

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
