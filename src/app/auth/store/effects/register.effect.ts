import {HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {AuthService} from '../../services/auth.service'
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
  loginSuccessAction,
  loginAction,
  loginFailureAction,
} from '../actions/actions'
import {PersistanceService} from '../../services/persistance.service'
import {Router} from '@angular/router'

@Injectable()
export class RegisterEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('acessToken', currentUser.token)
            return registerSuccessAction({currentUser})
          }),
          catchError((errorRespone: HttpErrorResponse) => {
            return of(
              registerFailureAction({errors: errorRespone.error.errors})
            )
          })
        )
      })
    )
  })

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('acessToken', currentUser.token)
            return loginSuccessAction({currentUser})
          }),
          catchError((errorRespone: HttpErrorResponse) => {
            return of(loginFailureAction({errors: errorRespone.error.errors}))
          })
        )
      })
    )
  })

  redirectAfterRegister$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/')
        })
      )
    },
    {dispatch: false}
  )
  redirectAfterSubmit$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/')
        })
      )
    },
    {dispatch: false}
  )
}
