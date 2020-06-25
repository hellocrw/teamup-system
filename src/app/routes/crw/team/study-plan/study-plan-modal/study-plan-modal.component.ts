import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SFArrayWidgetSchema, SFDateWidgetSchema, SFTextareaWidgetSchema, SFSchema } from '@delon/form';
import { StudyPlanDto } from 'src/app/dto/StudyPlanDto';
import { DatePipe } from '@angular/common';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { CacheService } from '@delon/cache';
import { StudyPlanService } from 'src/app/services/study-plan/study-plan.service';

@Component({
  selector: 'app-study-plan-modal',
  providers: [DatePipe],
  templateUrl: './study-plan-modal.component.html',
  styleUrls: ['./study-plan-modal.component.less'],
})
export class StudyPlanModalComponent implements OnInit {
  isVisible = false;

  userInfo: UserInfoDto;

  @Output() element = new EventEmitter<StudyPlanDto>();

  schema: SFSchema = {
    properties: {
      spTitle: { type: 'string', title: '标题' },
      spContext: {
        type: 'string',
        title: '内容',
        // tslint:disable-next-line: no-object-literal-type-assertion
        ui: {
          widget: 'textarea',
          autosize: { minRows: 4, maxRows: 6 },
        } as SFTextareaWidgetSchema,
      },
      spLink: {
        type: 'string',
        title: '链接',
      },
      // TODO
    },
  };

  constructor(private datePipe: DatePipe, private cache: CacheService, private studyPlanService: StudyPlanService) {}

  ngOnInit() {
    this.cache.get<UserInfoDto>('userInfo').subscribe(f => (this.userInfo = f));
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

  submit(event: StudyPlanDto): void {
    event.userId = this.userInfo.userId;
    event.spTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    console.log('studyPlan:', event);
    // 提交给后台
    this.studyPlanService.insertStudyPlan(event).subscribe(res => {
      // 将数据发送给父组件
      this.element.emit(res.data);
    });
    this.isVisible = false;
  }
}
