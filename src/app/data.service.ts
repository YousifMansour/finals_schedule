import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getFinal(courseName: string, courseNumber: string) {
    var url: string = 'https://aub-finals.tk/api/:' + courseName +
        '/:' + courseNumber + '/getFinal';
    return this.http.get(url, {responseType: 'text'});
  }

  getFinalBySection(courseName: string, courseNumber: string, section: string) {
    var url: string = 'https://aub-finals.tk/api/:' + courseName +
        '/:' + courseNumber + '/:' + section + '/getFinalBySection';
    return this.http.get(url, {responseType: 'text'});
  }

  getAllFinals() {
    var url = 'https://aub-finals.tk/api/getData';
    return this.http.get(url, {responseType: 'text'});
  }
}
