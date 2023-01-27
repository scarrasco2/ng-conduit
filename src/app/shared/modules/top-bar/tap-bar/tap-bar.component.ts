import {Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {
  selectCurrentUser,
  selectIsAnonymous,
  selectIsLoggedIn,
} from 'src/app/auth/store/selectors'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'

@Component({
  selector: 'mc-tap-bar',
  templateUrl: './tap-bar.component.html',
  styleUrls: ['./tap-bar.component.scss'],
})
export class TapBarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean | null>
  isAnonymous$!: Observable<boolean>
  currentuser$!: Observable<CurrentUserInterface | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn)
    this.isAnonymous$ = this.store.select(selectIsAnonymous)
    this.currentuser$ = this.store.select(selectCurrentUser)
  }
}
