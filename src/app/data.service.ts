import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://www.yousifmansour.space/api/aub-finals';

  getFinal(courseName: string, courseNumber: string) {
    var url: string =
        this.baseUrl + '/:' + courseName + '/:' + courseNumber + '/getFinal';
    return this.http.get(url, {responseType: 'text'});
  }

  getFinalBySection(courseName: string, courseNumber: string, section: string) {
    var url: string = this.baseUrl + '/:' + courseName + '/:' + courseNumber +
        '/:' + section + '/getFinalBySection';
    return this.http.get(url, {responseType: 'text'});
  }

  getAllFinals() {
    var url = this.baseUrl + '/getData';
    return this.http.get(url, {responseType: 'text'});
  }
}
