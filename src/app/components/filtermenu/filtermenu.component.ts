import { EventsService } from './../../services/events.service'
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { IonRange, MenuController } from '@ionic/angular'

@Component({
    selector: 'app-filtermenu',
    templateUrl: './filtermenu.component.html',
    styleUrls: ['./filtermenu.component.scss'],
})
export class FiltermenuComponent implements OnInit {
    @ViewChild('pricefilter', { static: false }) pricefilter: IonRange
    filter = {
        price: {
            lower: 0,
            upper: 99999
        },
        category: 'all'
    }

    constructor(
        private eventSvc: EventsService,
        private menuCtrl: MenuController,
    ) { }

    ngOnInit() { }

    filterProducts() {
        this.menuCtrl.close('filtermenu')
        if (this.pricefilter.value !== 0) {

        }
        this.eventSvc.emit('filterproduct', this.filter)
    }

}
