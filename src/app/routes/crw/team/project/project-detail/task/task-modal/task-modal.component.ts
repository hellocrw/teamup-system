import { Component, OnInit } from '@angular/core';
import { SFArrayWidgetSchema, SFSchema, SFDateWidgetSchema, SFTextareaWidgetSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
import { TaskDto } from 'src/app/dto/TaskDto';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.less'],
})
export class TaskModalComponent implements OnInit {
  // 是否显示对话框
  isVisible = false;

  task: TaskDto = null;

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
  };

  constructor(private msg: NzMessageService, private taskService: TaskService) {}

  ngOnInit() {
    this.task = this.initFormData();
  }

  /**
   * 初始化数据
   */
  initFormData(item?: TaskDto): TaskDto {
    return {
      taskId: item ? item.taskId : null,
      teamId: item ? item.teamId : null,
      proId: item ? item.proId : null,
      taskCreateTime: item ? item.taskCreateTime : null,
      taskStartTime: item ? item.taskStartTime : null,
      taskEndTime: item ? item.taskEndTime : null,
      taskContent: item ? item.taskContent : null,
      userId: item ? item.userId : null,
      taskStatus: item ? item.taskStatus : null,
      taskMark: item ? item.taskMark : null,
      subTaskDto: item ? item.subTaskDto : null,
    };
  }

  submit(value: TaskDto) {
    this.msg.success(JSON.stringify(value));
    this.task = value;
    this.task.teamId = '1';
    this.task.proId = '1';
    this.task.userId = '1';
    this.taskService.saveTask(this.task).subscribe(datas => console.log(datas));
    this.isVisible = false;
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
  handleOk() {
    this.isVisible = false;
  }
}
