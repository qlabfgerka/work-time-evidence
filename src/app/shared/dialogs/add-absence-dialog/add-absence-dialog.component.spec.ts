import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAbsenceDialogComponent } from './add-absence-dialog.component';

describe('AddAbsenceDialogComponent', () => {
  let component: AddAbsenceDialogComponent;
  let fixture: ComponentFixture<AddAbsenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAbsenceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAbsenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
