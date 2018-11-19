import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material";

@Component({
  selector: 'app-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.sass']
})
export class TabItemComponent implements OnInit {
  statusList = [1, 2, 3, 4, 5, 6, 7, 8];
  displayedColumns: string[] = ['row', 'datetime', 'name', 'img_path', 'phone'];
  pageSizeOptions = [5, 15, 30, 50];
  @Input() dataSource: any;
  @Input() item: any;
  constructor() { }

  ngOnInit() {
  }

}
