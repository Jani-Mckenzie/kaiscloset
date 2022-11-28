import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap, Subject } from 'rxjs';
import { User } from '../models/user'
import { APIResponse } from '../models/api-response';
import * as moment from 'moment';
import { UserService } from '../services/user.service';

import { JwtHelperService } from '@auth0/angular-jwt';

const jwt = new JwtHelperService();

interface APIRES {
  status: string,
  message?: string,
  data: { [key: string]: any }
}

class DecodedToken {
  exp!: number;
  username!: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:3000/api/v1/users/';
  private decodedToken?: any;

  private _handleHttpErrors(retVal: any) {
    return (err: any) => {
      console.log(err);
      return of({ status: err.status, message: err.message, data: retVal });
    };
  }

  constructor(private http: HttpClient, private userService: UserService) {

    this.decodedToken = localStorage.getItem('auth_meta') || new DecodedToken();
  }
  private _loggedInUser$ = new Subject<User | undefined>();
  get loggedInUser$() {
    return this._loggedInUser$;
  }

  public login(userData: any) {
    return this.http.post<APIResponse<User>>(`${this.API_URL}` + 'login', userData).pipe(tap(data => {
      if (data.status == 'success') {
        this.getRole(data.data!['user.role'])
        this.saveToken(data.data!['token'])
      }
    }), catchError(this._handleHttpErrors(new User())));
  }

  public autoLogin(): void {
    const dataFromStorage = localStorage.getItem('auth_meta')
    if (!dataFromStorage) return;

    const data = JSON.parse(dataFromStorage);
    this.userService.getUserById(data.id).subscribe(res => {

      if (res.status == 'success') {
        this.loggedInUser$.next(res.data!['user']);
      }
    });


  }

  saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
  }
  getToken() {
    return localStorage.getItem('auth_tkn')
  }


  register(userData: any) {
    return this.http.post(`${this.API_URL}` + 'signUp', userData)
  }

  getRole(role: any) {
    return role;
  }

  public logout(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');
    localStorage.removeItem('role');
    this.loggedInUser$.next(undefined);
    this.decodedToken = new DecodedToken();
  }

  isAuthenticated(): boolean {
    return moment().isBefore(moment.unix(this.decodedToken.exp));
  }
  public getUsername(): string {
    return this.decodedToken.username;
  }

  roleAccess(menuName: any) {
    const role = localStorage.getItem('role');
    if (role == 'admin') {
      return true;
    } else {
      if (menuName == 'adduser') {
        return true;
      } else {
        return false;
      }
    }
  }



}
