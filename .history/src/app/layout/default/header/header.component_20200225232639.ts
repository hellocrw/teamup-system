import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  searchToggleStatus: boolean;

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

  toTeamManagement(): void {
    this.router.navigate(["/team/team-management"]);
  }
}
