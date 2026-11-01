import { Component, inject, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellKeyDownEvent,
  ColDef,
  FullWidthCellKeyDownEvent,
  GetRowIdFunc,
  RowClickedEvent,
} from 'ag-grid-community';
import { scoutStore } from './store/scout.store';
import { ScoutObject } from './types';
import { ButtonModule } from 'primeng/button';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { DefaultColRef, ScoutColDef } from './constants/ag-grid.constants';
import { scoutGridTheme } from './utils/theme/scout.theme';
import { ErrorScreenComponent } from '@shared/ui';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { KeyValuePipe } from '@angular/common';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-scout',
  templateUrl: './scout.component.html',
  imports: [
    AgGridAngular,
    ButtonModule,
    ErrorScreenComponent,
    InputTextModule,
    DialogModule,
    KeyValuePipe,
  ],
})
export class ScoutComponent {
  protected readonly store = inject(scoutStore);
  protected readonly getRowId: GetRowIdFunc<ScoutObject> = (p) => p.data.designation;
  protected readonly defaultColDef: ColDef<ScoutObject> = DefaultColRef;
  protected readonly colDefs = ScoutColDef;
  protected readonly theme = scoutGridTheme;

  protected readonly quickFilter = signal('');

  /* update the selected object to store */
  protected onRowClicked(event: RowClickedEvent<ScoutObject>) {
    this.store.select(event.data?.designation ?? null);
  }

  protected onCellKeyDown(
    e: CellKeyDownEvent<ScoutObject, any, any> | FullWidthCellKeyDownEvent<ScoutObject, any>,
  ) {
    const keyboardEvent = e.event as KeyboardEvent;

    if (keyboardEvent.key === 'Enter') {
      this.onRowClicked(e as unknown as RowClickedEvent);
    }
  }
}
