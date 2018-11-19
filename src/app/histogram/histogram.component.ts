import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {HttpClient} from "@angular/common/http";
import * as moment from 'moment';
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.sass']
})
export class HistogramComponent implements OnInit {
  @ViewChild('barChart') chartRef: ElementRef;

  statusList = [1, 2, 3, 4, 5, 6, 7, 8];
  pageSizeOptions = [5, 15, 30, 50];
  eventsList = [];
  tabledList = [];
  dataSource = new MatTableDataSource<any>();
  tableLength = this.dataSource.data.length;
  displayedColumns: string[] = ['row', 'status', 'datetime', 'name', 'img_path', 'phone'];

  isTableView: boolean;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private changeDetectorRefs: ChangeDetectorRef) {
  }

  updateRoute(status) {
    if (status === 'table') {
      this.isTableView = true
    } else {
      this.isTableView = false;
      this.router.navigate(['/hg'], {queryParams: {event: status}});
      // this.fetchData();
      window.location.reload();
    }
  }

  routeParams = this.route.snapshot.queryParams.event;
  title = `Отчет по событиям типа ${this.routeParams}`;

  isLoading = true;
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels: string[] = [];
  barChartType: string = 'bar';
  barChartLegend: boolean = false;
  barChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  barChartData: any[] = [
    {data: [], label: 'Событий за день'},
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  //#487fc2
  public chartHovered(e: any): void {
    console.log(e);
  }

  formTable(list) {
    // datetime: "2018-10-16T13:48:35.199Z"
    // img_path: "imgs/PurEaPvH0KNkzOMcUdiM.png"
    // name: null
    // phone: "+79055304673"
    // row: 0
    // status: 1

  }

  fetchData() {
    this.http.get('http://avia.splat.cleverbots.ru:8000/splat/attempts/?format=json').subscribe((res: Array<object>) => {
      this.statusList.forEach((statusCode) => {
        this.tabledList = res.slice();
        this.eventsList[statusCode] = res.filter((item: any) => {
          if (item.status === statusCode) return item
        })
      });
      // moment(this.eventsList[1][0].datetime).format('L');
      let minDay = this.eventsList[1][0].datetime;
      let maxDay = this.eventsList[1][0].datetime;
      this.eventsList[1].forEach((current) => {
        if (current.datetime < minDay) minDay = current.datetime;
        if (current.datetime > maxDay) maxDay = current.datetime;
      });


      // Sort data by datetime
      this.eventsList.forEach(item => {
        if (this.eventsList[item]) this.eventsList[item].sort((a, b) => {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          let c: any = new Date(b.datetime);
          let d: any = new Date(a.datetime);
          return c - d;
        });
      });

      // Copy sorted list to display in table
      this.dataSource = new MatTableDataSource(this.tabledList);
      this.tableLength = this.dataSource.data.length;
      // Count all events by days
      let eventsCounter = [];
      let temp = 0;
      let prevDate = moment(minDay).format('DD.MM.YY');
      this.eventsList.forEach((item, i, arr) => {
        eventsCounter[i] = [];
        this.eventsList[i].forEach(item => {
          let date = moment(Object.values(item)[1]).format('DD.MM.YY');
          if (date === prevDate) {
            temp++;
          } else {
            eventsCounter[i].push({
              date: prevDate,
              sum: temp
            });
            temp = 1;
            prevDate = date
          }
        })
      });

      // Update data in chart
      let data = eventsCounter[this.routeParams].map(item => item.sum);
      this.barChartLabels = eventsCounter[this.routeParams].map(item => item.date);
      let clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].data = data;
      this.barChartData = clone;
      this.changeDetectorRefs.detectChanges();

      this.isLoading = false;
    });
  }


  ngOnInit() {
    this.fetchData()
  }
}
