import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemainesPlanifieesComponent } from './semaines-planifiees.component';

describe('SemainesPlanifieesComponent', () => {
  let component: SemainesPlanifieesComponent;
  let fixture: ComponentFixture<SemainesPlanifieesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemainesPlanifieesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemainesPlanifieesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
