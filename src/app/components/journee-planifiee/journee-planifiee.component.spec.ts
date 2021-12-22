import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneePlanifieeComponent } from './journee-planifiee.component';

describe('JourneePlanifieeComponent', () => {
  let component: JourneePlanifieeComponent;
  let fixture: ComponentFixture<JourneePlanifieeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneePlanifieeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneePlanifieeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
