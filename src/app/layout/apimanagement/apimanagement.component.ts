import { Component, OnInit } from '@angular/core';
import { CricapiService } from '../../shared/services/cricapi.service';
import { Match } from '../../shared/model/match.model';
import { MatchService } from '../../shared/services/match.service';
import * as moment from 'moment';

@Component({
  selector: 'app-apimanagement',
  templateUrl: './apimanagement.component.html',
  styleUrls: ['./apimanagement.component.scss']
})
export class ApimanagementComponent implements OnInit {
  apiResponse: object;
  apiMatches: Match[];

  constructor(private cricapiService: CricapiService, private matchService: MatchService) { }

  ngOnInit() {

    debugger;
    console.log("All Matches");
    this.matchService.getMatches().subscribe(next => console.log(next));
    console.log("Today Matches");
    this.matchService.getTodayMatches().subscribe(data => console.log(data));
    
  }

  testFunction() {
    this.cricapiService.getMatches().subscribe(
      data => {
        this.apiResponse = data;
        this.apiMatches = new Map(Object.entries(this.apiResponse)).get('matches');
        this.apiMatches.forEach(element => {
          if (element.type == "Twenty20"){
            console.log(element);
            var todayDate = Date.now();
            var elementDate = new Date(element.date);
            if (moment(todayDate).isSame(elementDate, 'day')) {
              //create new match
              //this.matchService.createMatch(element);
              //return;
            }
            if(moment(elementDate).isBefore(todayDate, 'day')){
              //update match record
              //console.log(moment(elementDate).isBefore(todayDate, 'day'));
              //this.matchService.updateMatch(element);
            }
          }
        });
      });
  }
}
