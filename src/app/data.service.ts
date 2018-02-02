import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getFinal(courseName: string, courseNumber: string) {
    var url: string = 'http://107.191.46.198:8080/api/:' + courseName +
        '/:' + courseNumber + '/getFinal';
    return this.http.get(url, {responseType: 'text'});
  }

  getFinalBySection(courseName: string, courseNumber: string, section: string) {
    var url: string = 'http://107.191.46.198:8080/api/:' + courseName +
        '/:' + courseNumber + '/:' + section + '/getFinalBySection';
    return this.http.get(url, {responseType: 'text'});
  }

  getAllFinals() {
    var url = 'http://107.191.46.198:8080/api/getData';
    return this.http.get(url, {responseType: 'text'});
  }
}
