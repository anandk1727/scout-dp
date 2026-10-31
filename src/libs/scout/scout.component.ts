import { Component, inject, OnInit } from '@angular/core';
import { ScoutApiService } from './services/scout.service';

@Component({
  imports: [],
  selector: 'app-scout',
  templateUrl: './scout.component.html',
})
export class ScoutComponent implements OnInit {
  api = inject(ScoutApiService);
  ngOnInit(): void {
    this.api.getScoutResponse().subscribe();
  }
}
