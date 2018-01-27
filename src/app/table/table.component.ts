import {AfterContentChecked, Component, DoCheck, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

import {Final} from '../final';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns = ['index', 'courseName', 'pageNumber', 'rowNumber'];
  dataSource: any;
  elements: Element[];
  @Input() finals: Final[];

  constructor() {}

  ngOnInit() {
    this.elements = new Array<Element>();
    let counter: number = 1;
    for (let final of this.finals) {
      this.elements.push({
        index: counter,
        courseName: final.courseName + ' ' + final.courseNumber,
        pageNumber: final.pageNumber,
        rowNumber: final.rowNumber
      });
      counter++;
    }
    this.dataSource = new MatTableDataSource<Element>(this.elements);
  }

  ngAfterContentChecked() {
    this.elements = new Array<Element>();
    let counter: number = 1;
    for (let final of this.finals) {
      this.elements.push({
        index: counter,
        courseName: final.courseName + ' ' + final.courseNumber,
        pageNumber: final.pageNumber,
        rowNumber: final.rowNumber
      });
      counter++;
    }
    this.dataSource = new MatTableDataSource<Element>(this.elements);
  }
}

export interface Element {
  index: number;
  courseName: string;
  pageNumber: number;
  rowNumber: number;
}