import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneesPlanifieesComponent } from './journees-planifiees.component';

describe('JourneesPlanifieesComponent', () => {
  let component: JourneesPlanifieesComponent;
  let fixture: ComponentFixture<JourneesPlanifieesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneesPlanifieesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneesPlanifieesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
