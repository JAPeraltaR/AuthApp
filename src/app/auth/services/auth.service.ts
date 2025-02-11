import { computed, inject, Injectable, signal } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { AuthStatus } from '../enum';
import { CheckTokenResponse, LoginResponse } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environments.baseUrl;

  private http = inject(HttpClient);

  private _currentUser = signal< User | null >(null);

  private _authStatus = signal< AuthStatus >( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

  constructor() {
    this.checkOutStatus().subscribe();
  }

  private setAuthentication( user: User, access_token: string ): boolean {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem( 'access_token', access_token );
    return true;
  }

  login( email: string, pass: string ): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, pass };
    return this.http.post<LoginResponse>( url, body )
      .pipe(
        map( ({ user, access_token }) => this.setAuthentication( user, access_token )),
        catchError( err => throwError( () => err.error.message ))
      )
  }

  checkOutStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('access_token');
    if(!token) return of(false);

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ token }`)

    return this.http.get<CheckTokenResponse>(url,{ headers })
      .pipe(
        map( ({user, access_token}) => this.setAuthentication( user, access_token ) ),
        catchError( () => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      );
  }
}
