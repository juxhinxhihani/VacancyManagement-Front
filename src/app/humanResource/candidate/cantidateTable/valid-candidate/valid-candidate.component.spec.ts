import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidCandidateComponent } from './valid-candidate.component';

describe('ValidCandidateComponent', () => {
  let component: ValidCandidateComponent;
  let fixture: ComponentFixture<ValidCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
