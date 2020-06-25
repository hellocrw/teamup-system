import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SFArrayWidgetSchema, SFSchema, SFDateWidgetSchema, SFTextareaWidgetSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
import { TaskDto } from 'src/app/dto/TaskDto';
import { TaskService } from 'src/app/services/task/task.service';
import { DatePipe } from '@angular/common';
import { CacheService } from '@delon/cache';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-task-modal',
  providers: [DatePipe],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.less'],
})
export class TaskModalComponent implements OnInit {
  // 是否显示对话框
  isVisible = false;

  @Input() proId: string;

  @Output() element = new EventEmitter<TaskDto>();

  userId: string;

  userInfo: UserInfoDto;

  task: TaskDto = null;

  schema: SFSchema = {
    properties: {
      taskContent: { type: 'string', title: '任务名' },
      taskMark: {
        type: 'string',
        title: '任务备注',
        // tslint:disable-next-line: no-object-literal-type-assertion
        ui: {
          widget: 'textarea',
          autosize: { minRows: 4, maxRows: 6 },
        } as SFTextareaWidgetSchema,
      },
      taskStartTime: {
        type: 'string',
        // tslint:disable-next-line: no-object-literal-type-assertion
        ui: { widget: 'date', end: 'taskEndTime' } as SFDateWidgetSchema,
        // default: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
        title: '任务时间',
      },
      taskEndTime: {
        type: 'string',
        // tslint:disable-next-line: no-object-literal-type-assertion
        ui: { widget: 'date' } as SFDateWidgetSchema,
        // default: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      },
      // TODO
      subTaskDtos: {
        type: 'array',
        title: '子任务列表',
        maxItems: 4,
        items: {
          type: 'object',
          properties: {
            subTaskContent: { type: 'string', title: '名称' },
            // content: {
            //   type: 'string',
            //   title: '描述',
            // },
            // date: {
            //   type: 'string',
            //   // tslint:disable-next-line: no-object-literal-type-assertion
            //   ui: { widget: 'date', end: 'end' } as SFDateWidgetSchema,
            //   default: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
            //   title: '时间',
            // },
            // end: {
            //   type: 'string',
            //   default: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
            // },
          },
          required: ['subTaskName', 'taskName', 'taskStartTime', 'taskDescribe', 'content', 'date'],
        },
        // tslint:disable-next-line: no-object-literal-type-assertion
        ui: { grid: { arraySpan: 12 } } as SFArrayWidgetSchema,
      },
    },
  };

  constructor(
    private msg: NzMessageService,
    private taskService: TaskService,
    private datePipe: DatePipe,
    private cache: CacheService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.cache.get<UserInfoDto>('userInfo').subscribe(f => {
      this.userId = f.userId;
      this.userInfo = f;
    });
    this.task = this.initFormData();
  }

  /**
   * 初始化数据
   */
  initFormData(item?: TaskDto): TaskDto {
    return {
      taskId: item ? item.taskId : null,
      proId: item ? item.proId : null,
      taskCreateTime: item ? item.taskCreateTime : null,
      taskStartTime: item ? item.taskStartTime : null,
      taskEndTime: item ? item.taskEndTime : null,
      taskContent: item ? item.taskContent : null,
      userId: item ? item.userId : null,
      userName: item ? item.userName : null,
      taskStatus: item ? item.taskStatus : null,
      taskMark: item ? item.taskMark : null,
      taskLink: item ? item.taskLink : null,
      subTaskDtos: item ? item.subTaskDtos : null,
    };
  }

  /**
   * 添加任务
   */
  submit(value: TaskDto) {
    this.msg.success(JSON.stringify(value));
    value.proId = this.proId;
    // value.userId = '1';
    value.taskStatus = '1';
    value.userId = '0';
    // value.userName = this.userInfo.userName;
    value.userName = '无';
    value.taskStartTime = this.datePipe.transform(value.taskStartTime, 'yyyy-MM-dd');
    value.taskEndTime = this.datePipe.transform(value.taskEndTime, 'yyyy-MM-dd');
    value.taskCreateTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    console.log('value:', value);
    this.taskService.saveTask(value).subscribe(datas => {
      console.log(datas);
      // 将子组件添加的任务发送给父组件
      this.element.emit(datas.data);
      this.messageService.sendTask(datas.data);
    });
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
