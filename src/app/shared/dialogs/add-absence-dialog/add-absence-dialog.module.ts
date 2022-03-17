import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAbsenceDialogRoutingModule } from './add-absence-dialog-routing.module';
import { AddAbsenceDialogComponent } from './add-absence-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [AddAbsenceDialogComponent],
  imports: [
    CommonModule,
    AddAbsenceDialogRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class AddAbsenceDialogModule {}
