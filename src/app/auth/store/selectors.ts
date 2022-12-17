import {createFeatureSelector, createSelector} from '@ngrx/store'
import {AuthStateInterface} from '../types/authState.interface'

export const selectAuthFeature =
  createFeatureSelector<AuthStateInterface>('auth')

export const selectIsSubmitting = createSelector(
  selectAuthFeature,
  (authState: AuthStateInterface) => authState.isSubmitting
)

export const selectValidationErrors = createSelector(
  selectAuthFeature,
  (autState: AuthStateInterface) => autState.validationErrors
)
