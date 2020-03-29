import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TeamModalComponent } from 'src/app/routes/crw/team/team-modal/team-modal.component';
import { NewTeamModalComponent } from './components/new-team-modal.component';
import { NewProjectModalComponent } from './components/new-project-modal.component';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  searchToggleStatus: boolean;

  @ViewChild('newTeamModalComponent', { static: true })
  newTeamModalComponent: NewTeamModalComponent;

  @ViewChild('newProjectModalComponent', { static: true })
  newProjectModalComponent: NewProjectModalComponent;

  constructor(public settings: SettingsService, private router: Router, private messageService: MessageService) {}

  search($event): void {
    console.log('temp', $event.target.text);
    this.messageService.data = $event.target.text;
    this.router.navigateByUrl('/team');
  }

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }

  toTeamManagement(userId: string): void {
    this.router.navigate(['/team/team-management', userId]);
  }

  createTeam(userId: string): void {
    this.newTeamModalComponent.isVisible = true;
  }

  createProject(userId: string): void {
    this.newProjectModalComponent.isVisible = true;
  }
}
