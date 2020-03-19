import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppSettingsService } from '../../../core';

@Injectable()
export class UserService {
  private baseUrl = `${this.appSettings.baseApiUrl}/user/`;
   constructor( private appSettings: AppSettingsService,
    private http: HttpClient) { }

getAllUsers(): Observable<User[]> {
  // const url = `${this.baseUrl}GetUsers`;
  return this.http.get<User[]>(this.baseUrl);
}


addUser (user: User): Observable<User> {
  // const url = `${this.baseUrl}AddUser`;
  return this.http.post<User>(this.baseUrl, user).pipe(
    tap((myUser: User) => this.log(`added User w/ id=${myUser.userId}`)),
    catchError(this.handleError<User>('addUser'))
  );
}

updateUser (userId: number, user: User): Observable<any> {
  // const url = `${this.baseUrl}UpdateUser?id=${userId}`;

  const url = `${this.baseUrl}/${userId}`;
  return this.http.put(url, user).pipe(
    tap(_ => this.log(`updated User id=${user.userId}`)),
    catchError(this.handleError<any>('updateUser'))
  );
}


deleteUsers (users: User[]): Observable<boolean> {
  let deleteIds = '';
  users.forEach(user => {
    deleteIds += `ids=${user.userId}&`;
  });
  deleteIds = deleteIds.slice(0, -1);
  const url = `${this.baseUrl}?${deleteIds}`;
  return this.http.delete<boolean>(url).pipe(
    tap(_ => this.log(`deleted selected user`)),
    catchError(this.handleError<boolean>('deleteUsers'))
  );
}

private log(message: string) {
   // console.log(message);
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
   this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


}
