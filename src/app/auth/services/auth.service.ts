import {Injectable} from '@angular/core'
import {map, Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {RegisterUserInterface} from '../types/registerRequest.interface'
import {environment} from 'src/enviroments/environment'
import {AuthResponseInterface} from '../types/authResponse.interface'
import {LoginInterface} from '../types/login.interface'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterUserInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map((response: AuthResponseInterface) => response.user))
  }

  login(data: LoginInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map((response: AuthResponseInterface) => response.user))
  }
}
