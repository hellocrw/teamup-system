import { Component, OnInit } from '@angular/core';
import { SFArrayWidgetSchema, SFSchema, SFDateWidgetSchema, SFTextareaWidgetSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.less']
})
export class TaskModalComponent implements OnInit {

  // 是否显示对话框
  isVisible = false;


  schema: SFSchema = {
    properties: {
      taskName: { type: 'string', title: '任务名' },
      taskDescribe: {
        type: 'string',
        title: '任务描述',
        // tslint:disable-next-line: no-object-literal-type-assertion
        ui: {
          widget: 'textarea',
          autosize: { minRows: 4, maxRows: 6 },
        } as SFTextareaWidgetSchema,
      },
      taskDate: {
        type: 'string',
        // tslint:disable-next-line: no-object-literal-type-assertion
        ui: { widget: 'date', end: 'end' } as SFDateWidgetSchema,
        default: new Date(),
        title: '任务时间',
      },
      end: {
        type: 'string',
        default: new Date(),
      },
      product: {
        type: 'array',
        title: '子任务列表',
        maxItems: 4,
        items: {
          type: 'object',
          properties: {
            subTaskName: { type: 'string', title: '名称' },
            content: {
              type: 'string',
              title: '描述',
            },
            date: {
              type: 'string',
              // tslint:disable-next-line: no-object-literal-type-assertion
              ui: { widget: 'date', end: 'end' } as SFDateWidgetSchema,
              default: new Date(),
              title: '时间',
            },
            end: {
              type: 'string',
              default: new Date(),
            },
          },
          required: ['subTaskName', 'taskName', 'taskDescribe', 'content', 'date'],
        },
        // tslint:disable-next-line: no-object-literal-type-assertion
        ui: { grid: { arraySpan: 12 } } as SFArrayWidgetSchema,
      },
    },
  }

  constructor(public msg: NzMessageService) { }

  ngOnInit() {
  }

  submit(value: any) {
    this.msg.success(JSON.stringify(value));
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
