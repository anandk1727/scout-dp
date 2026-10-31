import { Component, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GetRowIdFunc } from 'ag-grid-community';
import { scoutStore } from './store/scout.store';
import { ScoutObject } from './types';
import { ButtonModule } from 'primeng/button';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { DefaultColRef, ScoutColDef } from './constants/ag-grid.constants';
import { scoutGridTheme } from './utils/theme/scout.theme';
import { ErrorScreenComponent } from '@shared/ui';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-scout',
  templateUrl: './scout.component.html',
  imports: [AgGridAngular, ButtonModule, ErrorScreenComponent],
})
export class ScoutComponent {
  protected readonly store = inject(scoutStore);
  protected readonly getRowId: GetRowIdFunc<ScoutObject> = (p) => p.data.designation;
  protected readonly defaultColDef: ColDef<ScoutObject> = DefaultColRef;
  protected readonly colDefs = ScoutColDef;

  protected readonly theme = scoutGridTheme;
}
