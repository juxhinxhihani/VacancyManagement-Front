import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveBlacklistComponent } from './move-blacklist.component';

describe('MoveBlacklistComponent', () => {
  let component: MoveBlacklistComponent;
  let fixture: ComponentFixture<MoveBlacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveBlacklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveBlacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
