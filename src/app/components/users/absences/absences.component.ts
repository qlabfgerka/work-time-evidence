import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { AbsenceDTO } from 'src/app/models/absence/absence.model';
import { DateFilterDTO } from 'src/app/models/filter/date.filter.model';
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

  public filter: DateFilterDTO | null = null;
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
    this.filter = new DateFilterDTO();
    this.filter.start = this.dateForm.get('start')?.value;
    this.filter.end = this.dateForm.get('end')?.value;
    this.refresh();
  }

  public reset(): void {
    this.filter = null;
    this.dateForm.reset();
    this.refresh();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public sortData(sort: Sort) {
    const data = this.absences.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'firstName':
          return this.compare(a.firstName!, b.firstName!, isAsc);
        case 'lastName':
          return this.compare(a.lastName!, b.lastName!, isAsc);
        case 'absenceDefinition':
          return this.compare(
            a.absenceDefinitionName!,
            b.absenceDefinitionName!,
            isAsc
          );
        case 'comment':
          return this.compare(a.comment!, b.comment!, isAsc);
        case 'time':
          return this.compare(a.timestamp!, b.timestamp!, isAsc);
        default:
          return 0;
      }
    });
  }

  private refresh(): void {
    this.absencesService
      .getAbsences(this.filter)
      .pipe(take(1))
      .subscribe((absences: Array<AbsenceDTO>) => {
        this.absences = absences;
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

  private compare(
    a: number | string | Date,
    b: number | string | Date,
    isAsc: boolean
  ): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
