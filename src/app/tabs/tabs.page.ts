import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
    activeTab: any
    constructor(
        private router: Router
    ) { }

    ngOnInit() {
    }

    getSelectedTab() {
        this.activeTab = this.router.url
    }

}
