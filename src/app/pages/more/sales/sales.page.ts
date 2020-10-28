import { chain } from 'lodash'
import { AngularFirestore } from '@angular/fire/firestore'
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Chart } from 'chart.js'
import * as moment from 'moment'
@Component({
    selector: 'app-sales',
    templateUrl: './sales.page.html',
    styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
    products
    totalSale
    months = []
    data
    @ViewChild('myChart', { static: true }) myChart: ElementRef

    constructor(
        private afs: AngularFirestore
    ) { }

    ngOnInit() {
        this.setWeekDays()
        console.log(this.months)
    }

    setWeekDays() {
        let currentDate = moment()
        let yearStart = currentDate.clone().startOf('year')

        for (let i = 0; i <= 11; i++) {
            this.months.push(moment(yearStart).add(i, 'month').format("MMM YYYY"))
        }
    }

    drawChart() {
        new Chart(this.myChart.nativeElement, {
            type: 'line',
            data: {
                labels: this.months,
                datasets: [
                    {
                        label: "Sales (Malaysian Ringgit)",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: this.data,
                        fill: false,
                        borderColor: "#2A67FE"
                    }
                ]
            },
        })
    }

    ionViewDidEnter() {
        let userId = JSON.parse(localStorage['user']).uid
        let q: any = this.afs.collection('orders')
        q.ref
            .where('seller_id', '==', userId)
            .where('status', '==', 'complete')
            .get()
            .then(query => {
                this.products = query.docs.map(ref => ref.data())
                this.data = this.products.map(p => ({
                    created_at: p.created_at,
                    price: p.sale_price,
                    month: moment(p.created_at, 'DD/MM/YYYY').format('MMM YYYY')
                }))
                this.data = this.months.map(m => {
                    let amount = this.data.find(d => d.month === m)
                    if (amount) {
                        return amount.price
                    } else {
                        return 0
                    }
                })
                this.drawChart()
                this.totalSale = this.products.reduce((acc, p) => acc + p.sale_price, 0)
            })
    }

}
