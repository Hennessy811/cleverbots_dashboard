import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator, MatSort} from "@angular/material";

export interface TableData {
  id: string;
  row: string;
  status: string;
  datetime: string;
  name: string;
  img_path: string;
  phone: string;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.sass']
})

export class GridComponent implements OnInit {
  statusList = [1, 2, 3, 4, 5, 6, 7, 8];
  pageSize = 20;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() { }

  applyFilter(filterValue) {
    const tableFilters = [];
    tableFilters.push({
      id: 'status',
      value: String(filterValue)
    });


    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  @Input() dataSource: any;
  @Input() displayedColumns: any;
  @Input() tableLength: any;
  @Input() pageSizeOptions: any;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate =
      (data: TableData, filtersJson: string) => {
        const matchFilter = [];
        const filters = JSON.parse(filtersJson);

        filters.forEach(filter => {
          const val = data[filter.id] === null ? '' : data[filter.id];
          matchFilter.push(String(val).toLowerCase().includes(filter.value.toLowerCase()));
        });
        return matchFilter.every(Boolean);
      };
  }
}
