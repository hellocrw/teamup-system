import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardV1Component } from './dashboard/v1/v1.component';
import { DashboardAnalysisComponent } from './dashboard/analysis/analysis.component';
import { DashboardMonitorComponent } from './dashboard/monitor/monitor.component';
import { DashboardWorkplaceComponent } from './dashboard/workplace/workplace.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { UserLockComponent } from './passport/lock/lock.component';
import { CallbackComponent } from './callback/callback.component';
import { TeamComponent } from './crw/team/team.component';
import { TeamDetailComponent } from './crw/team/team-detail/team-detail.component';
import { TeamManagementComponent } from './crw/team/team-management/team-management.component';
import { TeamManagementListComponent } from './crw/team/team-management/team-management-list.component';
import { ProjectDetailComponent } from './crw/team/project/project-detail/project-detail.component';
import { ProjectListComponent } from './crw/team/project/project-list/project-list.component';
import { TaskComponent } from './crw/team/project/project-detail/task/task.component';
import { FilesComponent } from './crw/team/project/project-detail/files/files.component';
import { NotificeComponent } from './crw/team/project/project-detail/notifice/notifice.component';
import { TaskModalComponent } from './crw/team/project/project-detail/task/task-modal/task-modal.component';
import { TeamModalComponent } from './crw/team/team-modal/team-modal.component';
import { TeamApplyViewComponent } from './crw/team/team-apply-view/team-apply-view.component';
import { ProjectApplyViewComponent } from './crw/team/project/project-apply-view/project-apply-view.component';
import { ApplyModalComponent } from './crw/team/team-apply-view/apply-modal/apply-modal.component';
import { TaskDetailComponent } from './crw/team/project/project-detail/task/task-detail/task-detail.component';
import { TeamListComponent } from './team-management/team-list/team-list.component';
import { TeamAnalysisComponent } from './team-management/team-analysis/team-analysis.component';
import { ProjectAnalysisComponent } from './project-management/project-analysis/project-analysis.component';
import { ProListComponent } from './project-management/pro-list/pro-list.component';
import { NotificeModalComponent } from './crw/team/project/project-detail/notifice/notifice-modal/notifice-modal.component';
import { FilesModelComponent } from './crw/team/project/project-detail/files/files-model/files-model.component';
import { TeamMoreComponent } from './crw/team/team-more/team-more.component';
import { ListComponent } from './crw/team/project/project-list/list/list.component';
import { UserMonitorComponent } from './dashboard/user-monitor/user-monitor.component';
import { ProMonitorComponent } from './dashboard/pro-monitor/pro-monitor.component';
import { FilesManagementComponent } from './dashboard/files-management/files-management.component';
import { AddProjectModalComponent } from './crw/team/team-detail/add-project-modal/add-project-modal.component';
import { TeamEditModalComponent } from './crw/team/project/project-list/team-edit-modal/team-edit-modal.component';
import { SendMessagementComponent } from './team-management/team-list/send-messagement/send-messagement.component';
import { StudyPlanModalComponent } from './crw/team/study-plan/study-plan-modal/study-plan-modal.component';
import { ChatComponent } from './crw/team/project/project-detail/chat/chat.component';
import { SummaryComponent } from './crw/everyday/summary/summary.component';

const COMPONENTS = [
  DashboardV1Component,
  DashboardAnalysisComponent,
  DashboardMonitorComponent,
  DashboardWorkplaceComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  UserLockComponent,
  CallbackComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    TeamComponent,
    TeamDetailComponent,
    TeamManagementComponent,
    TeamManagementListComponent,
    ProjectDetailComponent,
    ProjectListComponent,
    TaskComponent,
    FilesComponent,
    NotificeComponent,
    TaskModalComponent,
    TeamModalComponent,
    TeamApplyViewComponent,
    ProjectApplyViewComponent,
    ApplyModalComponent,
    TaskDetailComponent,
    TeamListComponent,
    TeamAnalysisComponent,
    ProListComponent,
    ProjectAnalysisComponent,
    NotificeModalComponent,
    FilesModelComponent,
    TeamMoreComponent,
    ListComponent,
    UserMonitorComponent,
    ProMonitorComponent,
    FilesManagementComponent,
    AddProjectModalComponent,
    TeamEditModalComponent,
    SendMessagementComponent,
    StudyPlanModalComponent,
    ChatComponent,
    SummaryComponent,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {}
