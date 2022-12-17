import {FormControl} from '@angular/forms'

export interface RegisterFormInterface {
  username: FormControl<string>
  password: FormControl<string>
  email: FormControl<string>
}
