import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {Observable, of} from 'rxjs'
import {registerAction} from 'src/app/auth/store/actions/actions'
import {
  selectIsSubmitting,
  selectValidationErrors,
} from 'src/app/auth/store/selectors'
import {RegisterUserInterface} from 'src/app/auth/types/registerRequest.interface'
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
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
      username: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required),
    })
  }

  onSubmit(): void {
    const request: RegisterUserInterface = {
      user: this.form?.value,
    }
    this.store.dispatch(registerAction({request}))
  }
}
