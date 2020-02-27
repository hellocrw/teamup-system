import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TeamModalComponent } from 'src/app/routes/crw/team/team-modal/team-modal.component';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  searchToggleStatus: boolean;

  // @ViewChild('teamModalComponent', { static: true })
  // teamModalComponent: TeamModalComponent;

  constructor(public settings: SettingsService, private router: Router) { }

  temp(): any {
    console.log('temp');
    this.router.navigateByUrl("/team");
  }

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }

  toTeamManagement(userId: string): void {
    this.router.navigate(["/team/team-management", userId]);
  }

  // create(): void {
  //   console.log('create');
  //   this.teamModalComponent.isVisible = true;
  // }
}
