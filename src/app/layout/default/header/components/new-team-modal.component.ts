import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-new-team-modal',
  template: `
    <nz-modal [nzMaskClosable]="false" [nzWidth]="1200" [(nzVisible)]="isVisible" nzTitle="新增团队"
    (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()" [nzBodyStyle]="{
    'max-height': '455px',
    'min-height': '300px',
    'overflow-y': 'auto',
    'overflow-x': 'hidden',
    padding: '24px 24px 0 24px'
  }">
    <p>Content one</p>
    <p>Content two</p>
    <p>Content three</p>
</nz-modal>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTeamModalComponent implements OnInit {

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
