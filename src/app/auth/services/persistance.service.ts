import {Injectable} from '@angular/core'

@Injectable()
export class PersistanceService {
  set(key: string, data: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('Failed to store user in local storage')
    }
  }
  get(key: string): unknown {
    try {
      return JSON.parse(localStorage.getItem(key) as string)
    } catch (e) {
      console.error('Failed getting data from local storage')
      return null
    }
  }
}
