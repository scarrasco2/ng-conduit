import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {BackendErrorsMessagesComponent} from './components/backendErrorsMessages/backendErrorMessages.component'

@NgModule({
  imports: [CommonModule],
  declarations: [BackendErrorsMessagesComponent],
  exports: [BackendErrorsMessagesComponent],
})
export class BackendErrorsMessageModule {}
