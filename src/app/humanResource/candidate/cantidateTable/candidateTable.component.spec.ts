import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CandidateTableComponent} from './candidateTable.component';

describe('HRTableComponent', () => {
  let component: CandidateTableComponent;
  let fixture: ComponentFixture<CandidateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateTableComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
