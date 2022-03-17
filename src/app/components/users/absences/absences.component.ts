import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { AbsenceDTO } from 'src/app/models/absence/absence.model';
import { AbsencesService } from 'src/app/services/users/absences/absences.service';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.scss'],
})
export class AbsencesComponent implements OnInit {
  public dateForm!: FormGroup;
  public dataSource!: MatTableDataSource<AbsenceDTO>;
  public absences!: Array<AbsenceDTO>;

  public displayedColumns: string[] = [
    'firstName',
    'lastName',
    'absenceDefinition',
    'comment',
    'time',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly absencesService: AbsencesService
  ) {}

  ngOnInit(): void {
    this.dateForm = this.formBuilder.group({
      start: ['', []],
      end: ['', []],
    });
    this.refresh();
  }

  public get errorControl() {
    return this.dateForm.controls;
  }

  public applyDateFilter(): void {
    console.log(this.dateForm.value);
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private refresh(): void {
    this.absencesService
      .getAbsences()
      .pipe(take(1))
      .subscribe((absences: Array<AbsenceDTO>) => {
        this.absences = absences;
        console.log(this.absences);
        this.initTable();
      });
  }

  private initTable(): void {
    this.dataSource = new MatTableDataSource(this.absences);
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
