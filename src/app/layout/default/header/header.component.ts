import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TeamModalComponent } from 'src/app/routes/crw/team/team-modal/team-modal.component';
import { NewTeamModalComponent } from './components/new-team-modal.component';
import { NewProjectModalComponent } from './components/new-project-modal.component';
import { MessageService } from 'src/app/services/message/message.service';
import { CacheService } from '@delon/cache';
import { UserInfoDto } from 'src/app/dto/UserInfoDto';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  searchToggleStatus: boolean;

  userInfo: UserInfoDto;

  @ViewChild('newTeamModalComponent', { static: true })
  newTeamModalComponent: NewTeamModalComponent;

  @ViewChild('newProjectModalComponent', { static: true })
  newProjectModalComponent: NewProjectModalComponent;

  constructor(
    public settings: SettingsService,
    private router: Router,
    private messageService: MessageService,
    private cache: CacheService,
    private teamService: TeamService,
  ) {
    this.cache.get<UserInfoDto>('userInfo').subscribe(f => (this.userInfo = f));
  }

  search($event): void {
    this.router.navigateByUrl('/team');
    // console.log('temp:', $event);
    if ($event.target.innerText === '校外') {
      // this.messageService.data = $event.target.innerText;
      this.messageService.sendUniversityScope($event.target.innerText);
    } else if ($event.target.innerText === '校内') {
      this.messageService.sendUniversityScope(this.userInfo.university);
    }
  }

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }

  toTeamManagement(): void {
    this.router.navigateByUrl(`team/team-management`);
  }

  createTeam(): void {
    this.newTeamModalComponent.isVisible = true;
  }

  createProject(): void {
    this.newProjectModalComponent.isVisible = true;
  }

  to() {
    this.router.navigateByUrl('/team');
    // window.location.reload();
  }
}
