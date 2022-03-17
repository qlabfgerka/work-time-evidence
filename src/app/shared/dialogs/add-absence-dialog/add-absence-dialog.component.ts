import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { AbsenceDefinitionsDTO } from 'src/app/models/absence/absence-definitions.model';
import { AbsenceDTO } from 'src/app/models/absence/absence.model';
import { AbsencesService } from 'src/app/services/users/absences/absences.service';

@Component({
  selector: 'app-add-absence-dialog',
  templateUrl: './add-absence-dialog.component.html',
  styleUrls: ['./add-absence-dialog.component.scss'],
})
export class AddAbsenceDialogComponent implements OnInit {
  public absenceDefinitions!: Array<AbsenceDefinitionsDTO>;
  public addAbsenceForm!: FormGroup;
  public isLoading!: boolean;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly absencesService: AbsencesService,
    private readonly dialogRef: MatDialogRef<AddAbsenceDialogComponent>
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  public get errorControl() {
    return this.addAbsenceForm.controls;
  }

  public addAbsence(): void {
    if (this.addAbsenceForm.valid) {
      const absence: AbsenceDTO = {
        absenceDefinitionId: this.addAbsenceForm.get('absence')?.value,
        comment: this.addAbsenceForm.get('comment')?.value,
        timestamp: new Date(),
      };
      this.dialogRef.close(absence);
    }
  }

  private refresh(): void {
    this.isLoading = true;
    this.absencesService
      .getAbsenceDefinitions()
      .pipe(take(1))
      .subscribe((absences: Array<AbsenceDefinitionsDTO>) => {
        this.absenceDefinitions = absences;
        this.isLoading = false;
        this.initForm();
      });
  }

  private initForm(): void {
    this.addAbsenceForm = this.formBuilder.group({
      absence: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
  }
}
