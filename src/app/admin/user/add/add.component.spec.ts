import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Add } from './add.component';

describe('AddNewUserComponent', () => {
  let component: Add;
  let fixture: ComponentFixture<Add>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Add ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Add);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
