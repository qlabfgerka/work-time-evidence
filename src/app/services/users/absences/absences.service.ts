import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AbsenceDefinitionsDTO } from 'src/app/models/absence/absence-definitions.model';
import { AbsenceDTO } from 'src/app/models/absence/absence.model';
import { DateFilterDTO } from 'src/app/models/filter/date.filter.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AbsencesService {
  constructor(private readonly httpClient: HttpClient) {}

  public getAbsences(
    filter: DateFilterDTO | null
  ): Observable<Array<AbsenceDTO>> {
    let params = new HttpParams();
    if (filter && filter.start) {
      params = params.append('dateFrom', filter.start.toDateString());
    }
    if (filter && filter.end)
      params = params.append('dateTo', filter.end.toDateString());
    return this.httpClient
      .get<Array<AbsenceDTO>>(`${environment['api-hostname']}/Absences`, {
        params,
      })
      .pipe(map((response) => this.mapToAbsences(response)));
  }

  public getAbsenceDefinitions(): Observable<Array<AbsenceDefinitionsDTO>> {
    return this.httpClient
      .get<Array<AbsenceDefinitionsDTO>>(
        `${environment['api-hostname']}/AbsenceDefinitions`
      )
      .pipe(map((response) => this.mapToAbsenceDefinitions(response)));
  }

  public addAbsence(absence: AbsenceDTO): Observable<AbsenceDTO> {
    return this.httpClient
      .post<AbsenceDTO>(`${environment['api-hostname']}/Absences`, absence)
      .pipe(map((response) => this.mapAbsence(response)));
  }

  private mapToAbsences(absences: Array<any>): Array<AbsenceDTO> {
    let absencesDTO = new Array();
    absences.forEach((absence) => {
      absencesDTO.push(this.mapAbsence(absence));
    });
    return absencesDTO;
  }

  private mapAbsence(absence: any): AbsenceDTO {
    const absenceDTO: AbsenceDTO = {
      absenceDefinitionId: absence.AbsenceDefinitionId,
      comment: absence.Comment,
      timestamp: absence.Timestamp,
      absenceDefinitionName: absence.AbsenceDefinitionName,
      firstName: absence.FirstName,
      lastName: absence.LastName,
      userId: absence.UserId,
    };
    return absenceDTO;
  }

  private mapToAbsenceDefinitions(
    definitions: Array<any>
  ): Array<AbsenceDefinitionsDTO> {
    let absenceDefinitionsDTO = new Array();
    definitions.forEach((absenceDefinition) => {
      absenceDefinitionsDTO.push(this.mapAbsenceDefinition(absenceDefinition));
    });
    return absenceDefinitionsDTO;
  }

  private mapAbsenceDefinition(absenceDefinition: any): AbsenceDefinitionsDTO {
    const absenceDefinitionDTO: AbsenceDefinitionsDTO = {
      id: absenceDefinition.Id,
      name: absenceDefinition.Name,
    };
    return absenceDefinitionDTO;
  }
}
