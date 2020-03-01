import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apply-modal',
  templateUrl: './apply-modal.component.html',
  styleUrls: ['./apply-modal.component.less']
})
export class ApplyModalComponent implements OnInit {

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
