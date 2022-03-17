import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserDTO } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
})
export class AddUserDialogComponent implements OnInit {
  public addUserForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<AddUserDialogComponent>
  ) {}

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
    });
  }

  public get errorControl() {
    return this.addUserForm.controls;
  }

  public addUser(): void {
    if (this.addUserForm.valid) {
      const user: UserDTO = {
        email: this.addUserForm.get('email')?.value,
        firstName: this.addUserForm.get('firstName')?.value,
        lastName: this.addUserForm.get('lastName')?.value,
      };

      this.dialogRef.close(user);
    }
  }
}
