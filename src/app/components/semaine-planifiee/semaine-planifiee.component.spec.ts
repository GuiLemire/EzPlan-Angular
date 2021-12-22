import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemainePlanifieeComponent } from './semaine-planifiee.component';

describe('SemainePlanifieeComponent', () => {
  let component: SemainePlanifieeComponent;
  let fixture: ComponentFixture<SemainePlanifieeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemainePlanifieeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemainePlanifieeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
