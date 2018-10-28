import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://www.yousifmansour.space/api/aub-finals';
  // baseUrl = 'http://localhost:8888/api';

  getFinal(courseName: string, courseNumber: string) {
    var url: string = this.baseUrl + '/' + courseName + '/' + courseNumber;
    return this.http.get(url, {responseType: 'text'});
  }

  getFinalBySection(courseName: string, courseNumber: string, section: string) {
    var url: string =
        this.baseUrl + '/' + courseName + '/' + courseNumber + '/' + section;
    return this.http.get(url, {responseType: 'text'});
  }

  getAllFinals() {
    var url = this.baseUrl + '/getData';
    return this.http.get(url, {responseType: 'text'});
  }
}
