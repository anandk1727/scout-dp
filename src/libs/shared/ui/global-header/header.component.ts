import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { toggleDarkMode } from '@shared/utils';

@Component({
  selector: 'global-header',
  templateUrl: './header.component.html',
  imports: [RouterLink, RouterLinkActive],
})
export class GlobalHeaderComponent {
  protected toggleTheme() {
    toggleDarkMode();
  }
}
