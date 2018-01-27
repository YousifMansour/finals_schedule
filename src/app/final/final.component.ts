import {NgClass} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Message} from 'primeng/api';

import {DataService} from '../data.service';
import {Final} from '../final';


@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent implements OnInit {
  finals: Final[];

  name: string = '';
  msgs: Message[];

  events: any[];
  headerConfig: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.headerConfig = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek'
    };

    this.finals = new Array<Final>();
    this.events = new Array<any>();
    this.msgs = new Array<Message>();
  }

  removeFinal(final: Final) {
    this.finals.splice(this.finals.indexOf(final), 1);
    for (let event of this.events) {
      if (event.id == final.id) {
        this.events.splice(this.events.indexOf(event), 1);
      }
    }
  }

  getFinal(courseName: string, courseNumber: string, section: string) {
    let size = this.finals.length;
    if (courseName == 'all') {
      this.dataService.getAllFinals().subscribe(function(res) {

        let finalData = JSON.parse(res);

        for (let data of finalData) {
          let newFinal = new Final(
              data.fullLine, data.courseName, data.courseNumber, data.section,
              data.roomName, data.roomNumber, data.weekDay, data.monthName,
              data.monthNumber, data.year, data.time, data.amPm,
              data.pageNumber, data.rowNumber);

          this.finals.push(newFinal);

          let Time: string = data.time;
          if (Time.length == 4) Time = '0' + Time;

          if (data.amPm == 'PM') {
            Time = (12 + Number(Time.charAt(0) + Time.charAt(1))) +
                Time.substring(2);
          }

          let Title: string = data.courseName + ' ' + data.courseNumber +
              ' in ' + data.roomName;
          if (data.roomNumber != undefined)
            Title = Title + ' ' + data.roomNumber;

          let event = {
            'title': Title,
            'start': data.year + '-' +
                '12' +
                '-' + data.monthNumber + 'T' + Time,
            'id': newFinal.id
          };
          // alert(event);
          // console.log(event);
          this.events.push(event);
        }

      }.bind(this));
    } else if (section == '') {
      this.dataService
          .getFinal(
              courseName.toUpperCase().replace(' ', ''),
              courseNumber.toUpperCase().replace(' ', ''))
          .subscribe(
              function(res, err) {

                let finalData = JSON.parse(res);
                for (let data of finalData) {
                  let newFinal = new Final(
                      data.fullLine, data.courseName, data.courseNumber,
                      data.section, data.roomName, data.roomNumber,
                      data.weekDay, data.monthName, data.monthNumber, data.year,
                      data.time, data.amPm, data.pageNumber, data.rowNumber);

                  this.finals.push(newFinal);


                  let Time: string = data.time;
                  if (Time.length == 4) Time = '0' + Time;

                  if (data.amPm == 'PM') {
                    Time = (12 + Number(Time.charAt(0) + Time.charAt(1))) +
                        Time.substring(2);
                  }

                  let Title: string = data.courseName + ' ' +
                      data.courseNumber + ' in ' + data.roomName;
                  if (data.roomNumber != undefined)
                    Title = Title + ' ' + data.roomNumber;

                  let event = {
                    'title': Title,
                    'start': data.year + '-' +
                        '12' +
                        '-' + data.monthNumber + 'T' + Time,
                    'id': newFinal.id
                  };
                  // alert(event);
                  // console.log(event);
                  this.events.push(event);
                }
              }.bind(this),
              function(error: any) {
                let timeCreated = new Date().getTime();
                if (section != '') section = ' - ' + section;
                this.msgs.push({
                  severity: 'error',
                  summary: courseName.toUpperCase() + ' ' + courseNumber + ' ' +
                      section + ' Not found',
                  detail: 'Please check the course details.',
                  timeCreated: timeCreated
                });
                setTimeout(function() {
                  for (let message of this.msgs) {
                    if (message.timeCreated == timeCreated)
                      this.msgs.splice(this.msgs.indexOf(message), 1);
                    break;
                  }
                }.bind(this), 7000);
              }.bind(this));
    } else {
      this.dataService
          .getFinalBySection(
              courseName.toUpperCase().replace(' ', ''),
              courseNumber.toUpperCase().replace(' ', ''), section)
          .subscribe(
              function(res) {

                let data = JSON.parse(res);

                let newFinal = new Final(
                    data.fullLine, data.courseName, data.courseNumber,
                    data.section, data.roomName, data.roomNumber, data.weekDay,
                    data.monthName, data.monthNumber, data.year, data.time,
                    data.amPm, data.pageNumber, data.rowNumber);

                this.finals.push(newFinal);

                let Time: string = data.time;
                if (Time.length == 4) Time = '0' + Time;

                if (data.amPm == 'PM') {
                  Time = (12 + Number(Time.charAt(0) + Time.charAt(1))) +
                      Time.substring(2);
                }

                let Title: string = data.courseName + ' ' + data.courseNumber +
                    ' in ' + data.roomName;
                if (data.roomNumber != undefined)
                  Title = Title + ' ' + data.roomNumber;

                let event = {
                  'title': Title,
                  'start': data.year + '-' +
                      '12' +
                      '-' + data.monthNumber + 'T' + Time,
                  'id': newFinal.id
                };
                // alert(event);
                // console.log(event);
                this.events.push(event);
              }.bind(this),
              function(error: any) {
                let timeCreated = new Date().getTime();
                if (section != '') section = ' - ' + section;
                this.msgs.push({
                  severity: 'error',
                  summary: courseName.toUpperCase() + ' ' + courseNumber + ' ' +
                      section + ' Not found',
                  detail: 'Please check the course details.',
                  timeCreated: timeCreated
                });
                setTimeout(function() {
                  for (let message of this.msgs) {
                    if (message.timeCreated == timeCreated)
                      this.msgs.splice(this.msgs.indexOf(message), 1);
                    break;
                  }
                }.bind(this), 7000);
              }.bind(this));
    }
  }
}
