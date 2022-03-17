import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserDialogRoutingModule } from './add-user-dialog-routing.module';
import { AddUserDialogComponent } from './add-user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AddUserDialogComponent],
  imports: [
    CommonModule,
    AddUserDialogRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [AddUserDialogComponent],
})
export class AddUserDialogModule {}
