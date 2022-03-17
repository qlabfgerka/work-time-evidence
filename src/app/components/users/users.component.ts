import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { UserDTO } from 'src/app/models/user/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from 'src/app/shared/dialogs/add-user-dialog/add-user-dialog.component';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public dataSource!: MatTableDataSource<UserDTO>;
  public users!: Array<UserDTO>;

  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly usersService: UsersService,
    private readonly snackbarService: SnackbarService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public addUser(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      panelClass: 'wide-dialog',
    });

    dialogRef.afterClosed().subscribe((user: UserDTO) => {
      this.usersService
        .addUser(user)
        .pipe(take(1))
        .subscribe((user: UserDTO) => {
          this.snackbarService.openSnackbar(
            `User ${user.firstName} ${user.lastName} added successfully`
          );
          this.refresh();
        });
    });
  }

  private refresh(): void {
    this.usersService
      .getUsers()
      .pipe(take(1))
      .subscribe((users: Array<UserDTO>) => {
        this.users = users;
        this.initTable();
      });
  }

  private initTable(): void {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return (
        data.firstName!.toLowerCase().includes(filter) ||
        data.lastName!.toLowerCase().includes(filter) ||
        `${data.firstName!.toLowerCase()} ${data.lastName!.toLowerCase()}`.includes(
          filter
        )
      );
    };
  }
}
