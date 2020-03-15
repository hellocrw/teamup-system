import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-new-project-modal',
  template: `
    <nz-modal [nzMaskClosable]="false" [nzWidth]="800" [(nzVisible)]="isVisible" nzTitle="新增项目"
    (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()" [nzBodyStyle]="{
    'max-height': '455px',
    'min-height': '300px',
    'overflow-y': 'auto',
    'overflow-x': 'hidden',
    padding: '24px 24px 0 24px'
  }">
  <form nz-form>
  <nz-form-item nzGutter="24">
      <nz-form-label [nzSpan]="4" nzFor="fileName" nzRequired>所属团队</nz-form-label>
      <nz-form-control
        [nzSpan]="7"
      >
      <nz-select
          name="dispatchFileUnitName"
          nzPlaceHolder=""
          nzAllowClear
          required
        >
          <nz-option nzLabel="废铁团队" nzValue="废铁团队">
          </nz-option>
        </nz-select>
      </nz-form-control>
    </nz-form-item>
    <nz-form-item nzGutter="24">
      <nz-form-label [nzSpan]="4" nzFor="fileName" nzRequired>项目名称</nz-form-label>
      <nz-form-control
        [nzSpan]="7"
      >
        <input nz-input name="fileName" required />
      </nz-form-control>
      <nz-form-label [nzSpan]="4" nzRequired>项目人数</nz-form-label>
      <nz-form-control [nzSpan]="7">
      <input nz-input name="fileName" type="number" required />
      </nz-form-control>
    </nz-form-item>
    <nz-form-item nzGutter="24">
      <nz-form-label [nzSpan]="4" nzFor="fileName" nzRequired>开始时间</nz-form-label>
      <nz-form-control
        [nzSpan]="7"
      >
      <nz-range-picker></nz-range-picker>
      </nz-form-control>
      <nz-form-label [nzSpan]="4" nzRequired>项目类型</nz-form-label>
      <nz-form-control [nzSpan]="7">
      <input nz-input name="fileName" required />
      </nz-form-control>
    </nz-form-item>
    <nz-form-item>
      <nz-form-label [nzSm]="4" [nzXs]="24"  nzRequired>项目描述</nz-form-label>
      <nz-form-control [nzSm]="18" [nzXs]="24">
      <textarea rows="4" nz-input></textarea>
      </nz-form-control>
    </nz-form-item>
  </form>
</nz-modal>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProjectModalComponent implements OnInit {

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
