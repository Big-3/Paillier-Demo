import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poll } from '../interfaces/poll';
import { Option } from '../interfaces/option';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  headerOptions ={
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getPoll(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/poll', this.headerOptions);
  }

  vote(vote: String): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/vote', {vote: vote}, this.headerOptions);
  }

  getResults(): Observable<any>{
    return this.http.get<any>('http://localhost:3000/api/results', this.headerOptions);
  }
}
