import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoutComponent } from './scout.component';

describe('Scout', () => {
  let component: ScoutComponent;
  let fixture: ComponentFixture<ScoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
