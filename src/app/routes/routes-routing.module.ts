import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
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
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { TeamComponent } from './crw/team/team.component';
import { TeamDetailComponent } from './crw/team/team-detail/team-detail.component';
import { TeamManagementComponent } from './crw/team/team-management/team-management.component';
import { ProjectDetailComponent } from './crw/team/project/project-detail/project-detail.component';
import { ProjectListComponent } from './crw/team/project/project-list/project-list.component';
import { TaskComponent } from './crw/team/project/project-detail/task/task.component';
import { FilesComponent } from './crw/team/project/project-detail/files/files.component';
import { NotificeComponent } from './crw/team/project/project-detail/notifice/notifice.component';
import { TeamApplyViewComponent } from './crw/team/team-apply-view/team-apply-view.component';
import { ProjectApplyViewComponent } from './crw/team/project/project-apply-view/project-apply-view.component';
import { TeamListComponent } from './team-management/team-list/team-list.component';
import { ProListComponent } from './project-management/pro-list/pro-list.component';
import { TeamMoreComponent } from './crw/team/team-more/team-more.component';
import { ListComponent } from './crw/team/project/project-list/list/list.component';
import { Path } from '@delon/theme';
import { UserMonitorComponent } from './dashboard/user-monitor/user-monitor.component';
import { ProMonitorComponent } from './dashboard/pro-monitor/pro-monitor.component';
import { FilesManagementComponent } from './dashboard/files-management/files-management.component';
import { ACLGuard } from '@delon/acl';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [SimpleGuard],
    canActivateChild: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'team', pathMatch: 'full' },
      { path: 'index', redirectTo: 'team', pathMatch: 'full' },
      {
        path: 'team',
        component: TeamComponent,
      },
      { path: 'team/team-detail/:teamId', component: TeamDetailComponent },
      { path: 'team/team-apply-view/:teamId', component: TeamApplyViewComponent },
      { path: 'project/project-apply-view/:proId', component: ProjectApplyViewComponent },
      { path: 'team/team-management', component: TeamManagementComponent },
      {
        path: 'team/project/project-detail/:proId',
        component: ProjectDetailComponent,
        children: [
          { path: 'task', component: TaskComponent },
          { path: 'files', component: FilesComponent },
          { path: 'notifice', component: NotificeComponent },
        ],
      },
      { path: 'dashboard/v1', component: DashboardV1Component, canActivate: [ACLGuard], data: { guard: 'admin' } },
      { path: 'dashboard/analysis', component: DashboardAnalysisComponent },
      { path: 'dashboard/monitor', component: DashboardMonitorComponent },
      { path: 'dashboard/user-monitor', component: UserMonitorComponent },
      { path: 'dashboard/pro-monitor', component: ProMonitorComponent },
      { path: 'dashboard/files-management', component: FilesManagementComponent },
      { path: 'dashboard/workplace', component: DashboardWorkplaceComponent },
      { path: 'team-management/team-list', component: TeamListComponent },
      { path: 'team/team-more', component: TeamMoreComponent },
      { path: 'project-management/pro-list', component: ProListComponent },
      {
        path: 'team/project/project-list',
        component: ProjectListComponent,
        children: [
          {
            path: 'list/:teamId',
            component: ListComponent,
          },
        ],
      },
      {
        path: 'widgets',
        loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule),
      },
      { path: 'style', loadChildren: () => import('./style/style.module').then(m => m.StyleModule) },
      { path: 'delon', loadChildren: () => import('./delon/delon.module').then(m => m.DelonModule) },
      { path: 'extras', loadChildren: () => import('./extras/extras.module').then(m => m.ExtrasModule) },
      { path: 'pro', loadChildren: () => import('./pro/pro.module').then(m => m.ProModule) },
      // Exception
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
    ],
  },
  // 全屏布局
  {
    path: 'data-v',
    component: LayoutFullScreenComponent,
    children: [{ path: '', loadChildren: () => import('./data-v/data-v.module').then(m => m.DataVModule) }],
  },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        component: UserLoginComponent,
        data: { title: '登录', titleI18n: 'app.login.login' },
      },
      {
        path: 'register',
        component: UserRegisterComponent,
        data: { title: '注册', titleI18n: 'app.register.register' },
      },
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
        data: { title: '注册结果', titleI18n: 'app.register.register' },
      },
      {
        path: 'lock',
        component: UserLockComponent,
        data: { title: '锁屏', titleI18n: 'app.lock' },
      },
    ],
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    // RouterModule.forChild(routes),
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
