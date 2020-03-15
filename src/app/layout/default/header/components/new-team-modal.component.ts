import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-new-team-modal',
  template: `
    <nz-modal [nzMaskClosable]="false" [nzWidth]="800" [(nzVisible)]="isVisible" nzTitle="新增团队"
    (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()" [nzBodyStyle]="{
    'max-height': '455px',
    'min-height': '300px',
    'overflow-y': 'auto',
    'overflow-x': 'hidden',
    padding: '24px 24px 0 24px'
  }">

  <form nz-form>
    <nz-form-item nzGutter="24">
      <nz-form-label [nzSpan]="4" nzFor="fileName" nzRequired>团队名称</nz-form-label>
      <nz-form-control
        [nzSpan]="7"
      >
        <input nz-input name="fileName" required />
      </nz-form-control>
      <nz-form-label [nzSpan]="4" nzRequired>团队人数</nz-form-label>
      <nz-form-control [nzSpan]="7">
      <input nz-input name="fileName" type="number" required />
      </nz-form-control>
    </nz-form-item>
    <nz-form-item nzGutter="24">
      <nz-form-label [nzSpan]="4" nzFor="fileName" nzRequired>团队类型</nz-form-label>
      <nz-form-control
        [nzSpan]="7"
      >
      <nz-select
          name="dispatchFileUnitName"
          nzPlaceHolder=""
          nzAllowClear
          required
        >
          <nz-option nzLabel="技术类" nzValue="技术类">
          </nz-option>
        </nz-select>
      </nz-form-control>
      <nz-form-label [nzSpan]="4" nzRequired>团队范围</nz-form-label>
      <nz-form-control [nzSpan]="7">
        <nz-select
          name="dispatchFileUnitName"
          nzPlaceHolder=""
          nzAllowClear
          required
        >
          <nz-option nzLabel="校内" nzValue="校内">
          </nz-option>
        </nz-select>
      </nz-form-control>
    </nz-form-item>
    <nz-form-item nzGutter="24">
      <nz-form-label [nzSpan]="4" nzFor="fileName" nzRequired>团队性质</nz-form-label>
      <nz-form-control
        [nzSpan]="7"
      >
      <input nz-input name="fileName" required />
      </nz-form-control>
      <nz-form-label [nzSpan]="4" nzRequired>团队标签</nz-form-label>
      <nz-form-control [nzSpan]="7">
      <input nz-input name="fileName" required />
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSm]="4" [nzXs]="24" nzRequired>团队描述</nz-form-label>
      <nz-form-control [nzSm]="18" [nzXs]="24">
      <textarea rows="4" nz-input></textarea>
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSm]="4" [nzXs]="24" nzRequired>需要人员类型</nz-form-label>
      <nz-form-control [nzSm]="18" [nzXs]="24">
      <textarea rows="4" nz-input></textarea>
      </nz-form-control>
    </nz-form-item>
  </form>
  
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
