import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraireDisponibilitesComponent } from './horaire-disponibilites.component';

describe('HoraireDisponibilitesComponent', () => {
  let component: HoraireDisponibilitesComponent;
  let fixture: ComponentFixture<HoraireDisponibilitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoraireDisponibilitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraireDisponibilitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
