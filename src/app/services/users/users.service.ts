import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserDTO } from 'src/app/models/user/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly httpClient: HttpClient) {}

  public getUsers(): Observable<Array<UserDTO>> {
    return this.httpClient
      .get<Array<UserDTO>>(`${environment['api-hostname']}/Users`)
      .pipe(map((response) => this.mapToUsers(response)));
  }

  public addUser(user: UserDTO): Observable<UserDTO> {
    return this.httpClient
      .post<UserDTO>(`${environment['api-hostname']}/Users`, user)
      .pipe(map((response) => this.mapUser(response)));
  }

  private mapToUsers(users: Array<any>): Array<UserDTO> {
    let usersDTO = new Array();
    users.forEach((user) => {
      usersDTO.push(this.mapUser(user));
    });
    return usersDTO;
  }

  private mapUser(user: any): UserDTO {
    const userDTO: UserDTO = {
      email: user.Email,
      firstName: user.FirstName,
      id: user.Id,
      lastName: user.LastName,
      middleName: user.MiddleName,
    };
    return userDTO;
  }
}
