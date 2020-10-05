import { Subject } from 'rxjs'
import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'app-slidemenu',
    templateUrl: './slidemenu.component.html',
    styleUrls: ['./slidemenu.component.scss'],
})
export class SlidemenuComponent implements OnInit {

    @Input('slidecontent') slidecontent: any
    @Input('items') items: any
    @Input('options') options: any
    @Input('slideChangeSubject') slideChangeSubject$: Subject<{ index: 0 }>

    activeSlideIdx = 0

    constructor() { }

    ngOnInit() {
        this.slideChangeSubject$.subscribe(data => {
            this.activeSlideIdx = data.index
        })
    }

    ngOnDestroy() {
        this.slideChangeSubject$.unsubscribe()
    }

    selectCategory(i) {
        this.slidecontent.slideTo(i)
        this.activeSlideIdx = i
    }

}
