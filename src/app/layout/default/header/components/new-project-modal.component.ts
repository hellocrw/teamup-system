import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProjectDto } from 'src/app/dto/projectDto';
import { NzMessageService } from 'ng-zorro-antd';
import { ProjectService } from 'src/app/services/project/project.service';
import { DatePipe } from '@angular/common';
import { Result } from 'src/app/dto/Result';

@Component({
  selector: 'app-new-project-modal',
  providers: [DatePipe],
  template: `
    <nz-modal
      [nzMaskClosable]="false"
      [nzWidth]="800"
      [(nzVisible)]="isVisible"
      nzTitle="新增项目"
      (nzOnCancel)="handleCancel()"
      (nzOnOk)="handleOk(projectInfo.value)"
      [nzBodyStyle]="{
        'max-height': '455px',
        'min-height': '300px',
        'overflow-y': 'auto',
        'overflow-x': 'hidden',
        padding: '24px 24px 0 24px'
      }"
    >
      <form #projectInfo="ngForm" nz-form>
        <nz-form-item nzGutter="24">
          <nz-form-label [nzSpan]="4" nzFor="teamId" nzRequired>所属团队</nz-form-label>
          <nz-form-control [nzSpan]="7">
            <nz-select #teamId="ngModel" [(ngModel)]="item.teamId" name="teamId" nzPlaceHolder="" nzAllowClear required>
              <nz-option nzLabel="废铁团队" nzValue="1"> </nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item nzGutter="24">
          <nz-form-label [nzSpan]="4" nzFor="proName" nzRequired>项目名称</nz-form-label>
          <nz-form-control [nzSpan]="7">
            <input nz-input name="proName" #proName="ngModel" [(ngModel)]="item.proName" required />
          </nz-form-control>
          <nz-form-label [nzSpan]="4" nzFor="number" nzRequired>项目人数</nz-form-label>
          <nz-form-control [nzSpan]="7">
            <input nz-input name="number" #number="ngModel" [(ngModel)]="item.number" type="number" required />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item nzGutter="24">
          <nz-form-label [nzSpan]="4" nzFor="fileName" nzRequired>时间范围</nz-form-label>
          <nz-form-control [nzSpan]="7">
            <nz-range-picker></nz-range-picker>
          </nz-form-control>
          <nz-form-label [nzSpan]="4" nzRequired>项目类型</nz-form-label>
          <nz-form-control [nzSpan]="7">
            <input nz-input name="proType" #proType="ngModel" [(ngModel)]="item.proType" required />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="4" [nzXs]="24" nzRequired>项目描述</nz-form-label>
          <nz-form-control [nzSm]="18" [nzXs]="24">
            <textarea
              name="proDescribe"
              #proDescribe="ngModel"
              [(ngModel)]="item.proDescribe"
              rows="4"
              nz-input
            ></textarea>
          </nz-form-control>
        </nz-form-item>
      </form>
    </nz-modal>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProjectModalComponent implements OnInit {
  isVisible = false;

  item: ProjectDto = null;

  res: Result;

  constructor(private msg: NzMessageService, private projectService: ProjectService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.item = this.initFormData();
  }

  /**
   * 初始化表单数据
   */
  initFormData(item?: ProjectDto): ProjectDto {
    return {
      proId: item ? item.proId : null,
      proName: item ? item.proName : null,
      leaderName: item ? item.leaderName : null,
      proDescribe: item ? item.proDescribe : null,
      proDate: item ? item.proDate : null,
      proStartTime: item ? item.proStartTime : null,
      proEndTime: item ? item.proEndTime : null,
      proStatus: item ? item.proStatus : null,
      teamId: item ? item.teamId : null,
      proType: item ? item.proType : null,
      proCurrentNum: item ? item.proCurrentNum : null,
      proLimiedNum: item ? item.proLimiedNum : null,
      number: item ? item.number : null,
      seeNum: item ? item.seeNum : null,
      staff: item ? item.staff : null,
      staffList: item ? item.staffList : null,
    };
  }

  /**
   * 取消
   */
  handleCancel() {
    this.isVisible = false;
  }

  /**
   * 确定
   */
  handleOk(value) {
    console.log('value:', value);
    this.item.proDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.projectService.saveProject(this.item).subscribe(data => (this.res = data));
    this.msg.success('新建项目成功');
    this.isVisible = false;
  }
}
