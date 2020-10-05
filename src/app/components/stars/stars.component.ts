import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'

@Component({
    selector: 'app-stars',
    templateUrl: './stars.component.html',
    styleUrls: ['./stars.component.scss'],
})
export class StarsComponent implements OnInit {

    @Input('score') score: number
    @Input('totalStar') totalStar: number = 5
    @ViewChild('starinner', { static: true }) starinner: ElementRef
    constructor() { }

    ngOnInit() {
        this.starinner.nativeElement.style.width = this.score / this.totalStar * 100 + '%'
    }

}
