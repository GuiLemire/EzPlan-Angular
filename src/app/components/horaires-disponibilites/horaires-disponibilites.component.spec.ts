import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorairesDisponibilitesComponent } from './horaires-disponibilites.component';

describe('HorairesDisponibilitesComponent', () => {
  let component: HorairesDisponibilitesComponent;
  let fixture: ComponentFixture<HorairesDisponibilitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorairesDisponibilitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorairesDisponibilitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
