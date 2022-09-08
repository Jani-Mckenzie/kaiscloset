import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { User } from '../models/user';
import { APIResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'http://localhost:3000/api/v1/users';


  private _handleHttpErrors(retVal: any) {
    return (err: any) => {
      console.log(err);
      return of({ status: err.status, message: err.message, data: retVal });
    };
  }

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<APIResponse<User[]>> {
    return this.http
      .get<APIResponse<User[]>>(this.API_URL)
      .pipe(catchError(this._handleHttpErrors([])));
  }


  getUserById(id: string): Observable<APIResponse<User>> {
    return this.http.get<APIResponse<User>>(this.API_URL + '/' + id).pipe(catchError(this._handleHttpErrors(new User())));
  }

  createUser(data: User): Observable<APIResponse<User>> {
    return this.http.post<APIResponse<User>>(this.API_URL, data).pipe(catchError(this._handleHttpErrors(new User())));
  }

  updateUser(id: string, data: User): Observable<APIResponse<User>> {
    return this.http.put<APIResponse<User>>(this.API_URL + '/' + id, data).pipe(catchError(this._handleHttpErrors(new User())));
  }

  deleteUser(id: string): Observable<APIResponse<User>> {
    return this.http.delete<APIResponse<User>>(this.API_URL + '/' + id).pipe(catchError(this._handleHttpErrors(new User())));
  }
}
