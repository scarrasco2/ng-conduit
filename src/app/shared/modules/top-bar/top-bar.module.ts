import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TapBarComponent} from './tap-bar/tap-bar.component'
import {RouterModule} from '@angular/router'
@NgModule({
  declarations: [TapBarComponent],
  imports: [CommonModule, RouterModule],
  exports: [TapBarComponent],
})
export class TopBarModule {}
