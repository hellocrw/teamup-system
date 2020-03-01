import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplyModalComponent } from './apply-modal/apply-modal.component';

@Component({
  selector: 'app-team-apply-view',
  templateUrl: './team-apply-view.component.html',
  styleUrls: ['./team-apply-view.component.less']
})
export class TeamApplyViewComponent implements OnInit {

  array = [1, 2, 3, 4];

  @ViewChild('applyModalComponent', { static: true })
  applyModalComponent: ApplyModalComponent;

  constructor() { }

  ngOnInit() {
  }

  apply(event) {
    console.log('申请入队');
    this.applyModalComponent.isVisible = true;
  }

}
