import { Component, OnInit } from '@angular/core';
import { CricapiService } from '../../shared/services/cricapi.service';
import { Match } from '../../shared/model/match.model';
import { MatchService } from '../../shared/services/match.service';
import * as moment from 'moment';
import { element } from 'protractor';

@Component({
  selector: 'app-apimanagement',
  templateUrl: './apimanagement.component.html',
  styleUrls: ['./apimanagement.component.scss']
})
export class ApimanagementComponent implements OnInit {
  
  apiMatches: Match[];

  constructor(private cricapiService: CricapiService, private matchService: MatchService) { }

  ngOnInit() {

    debugger;
    console.log("All Matches");
    //this.matchService.getMatches().subscribe(next => console.log(next));
    console.log("Today Matches");
    //this.matchService.getTodayMatches().subscribe(data => console.log(data));
        
  }

  getResults() {
    console.log("Yesterday Matches");
    this.matchService.getYesterdayMatches().subscribe(data => {
      data.forEach(element => {
        this.updateResults(element);
      })
    });
  }

  updateResults(yesterdayMatch: Match) {
    this.cricapiService.getMatches().subscribe(matches => {
      var apiMatches: Match[] = new Map(Object.entries(matches)).get('matches');
      apiMatches.forEach(element => {
        if (element.unique_id == yesterdayMatch.unique_id) {
          if (element.winner_team){
            yesterdayMatch.winner_team = element.winner_team;
            this.matchService.updateMatch(yesterdayMatch);
          } else {
            console.log("Yesterday winner not announced yet!");
          }
        }
      });
    })


  }

  testFunction() {
    this.cricapiService.getMatches().subscribe(
      data => {
        this.apiMatches = new Map(Object.entries(data)).get('matches');
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
