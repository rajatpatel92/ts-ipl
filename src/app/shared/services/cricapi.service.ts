import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatchService } from './match.service';
import { Match } from '../model/match.model';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CricapiService {

  private apiUrl: string = "https://cricapi.com/api/matches/?apikey=zNWeUaA83hcEiq7NuzIAlml31qO2";

  constructor(private http: HttpClient, private matchService: MatchService) { }

  getMatches() {
    return this.http.get<Match>(this.apiUrl);
  }

  getYesterdayResults() {
    debugger;
    var yesterdayDate = moment().subtract(1, 'days').startOf('day').format('YYYY-MM-DDTHH:mm:ss.sss') + 'Z';
    var yesterdayResults: Match[];
    this.getMatches().pipe(
      map(match => {
        debugger;
        if (match.date.toString() == yesterdayDate) {
          yesterdayResults.push(match);
        };
      })
    );
  }


  updateMatches() {
    var allMatches = this.getMatches();
    
  }

}
