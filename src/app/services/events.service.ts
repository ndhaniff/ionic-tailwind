import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class EventsService {

    private source = new BehaviorSubject(null)
    item = this.source.asObservable()

    constructor() { }

    emit(event, payload) {
        this.source.next({
            eventName: event,
            payload
        })
    }
}
