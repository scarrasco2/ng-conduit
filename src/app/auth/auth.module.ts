import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Routes, RouterModule} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'
import {StoreModule} from '@ngrx/store'

import {EffectsModule} from '@ngrx/effects'
import {RegisterComponent} from './components/register/register/register.component'
import {reducers} from './store/reducers'
import {AuthService} from './services/auth.service'
import {HttpClientModule} from '@angular/common/http'
import {RegisterEffect} from './store/effects/register.effect'
import {BackendErrorsMessageModule} from '../shared/types/modules/backendErrorMessages/backendErrors.module'
import {LoginComponent} from './components/login/login.component'
import {PersistanceService} from './services/persistance.service'

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },

  {path: 'login', component: LoginComponent},
]
@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  providers: [AuthService, PersistanceService],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    HttpClientModule,
    EffectsModule.forFeature([RegisterEffect]),
    BackendErrorsMessageModule,
  ],
})
export class AuthModule {}
