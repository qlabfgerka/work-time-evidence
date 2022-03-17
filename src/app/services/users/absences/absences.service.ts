import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AbsenceDefinitionsDTO } from 'src/app/models/absence/absence-definitions.model';
import { AbsenceDTO } from 'src/app/models/absence/absence.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AbsencesService {
  constructor(private readonly httpClient: HttpClient) {}

  public getAbsenceDefinitions(): Observable<Array<AbsenceDefinitionsDTO>> {
    return this.httpClient
      .get<Array<AbsenceDefinitionsDTO>>(
        `${environment['api-hostname']}/AbsenceDefinitions`
      )
      .pipe(map((response) => this.mapToAbsenceDefinitions(response)));
  }

  public addAbsence(absence: AbsenceDTO): Observable<void> {
    return this.httpClient.post<void>(
      `${environment['api-hostname']}/Absences`,
      absence
    );
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
