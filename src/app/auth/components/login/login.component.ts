import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {Observable, of} from 'rxjs'
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface'
import {selectIsSubmitting, selectValidationErrors} from '../../store/selectors'
import {loginAction} from '../../store/actions/actions'
import {LoginInterface} from '../../types/login.interface'

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup | undefined
  isSubmitting$: Observable<boolean> | undefined
  backendErrors$: Observable<BackendErrorsInterface | null> = of(null)

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.select(selectIsSubmitting)
    this.backendErrors$ = this.store.select(selectValidationErrors)
  }
  initializeForm(): void {
    this.form = this.fb.group({
      email: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    })
  }

  onSubmit(): void {
    const request: LoginInterface = {
      user: this.form?.value,
    }
    this.store.dispatch(loginAction({request}))
  }
}
