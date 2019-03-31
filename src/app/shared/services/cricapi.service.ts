import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatchService } from './match.service';
import { Match } from '../model/match.model';

@Injectable({
  providedIn: 'root'
})

export class CricapiService {

  private apiUrl: string = "http://cricapi.com/api/matches/?apikey=zNWeUaA83hcEiq7NuzIAlml31qO2";

  constructor(private http: HttpClient, private matchService: MatchService) { }

  getMatches() {
    return this.http.get(this.apiUrl);
  }

  updateMatches() {
    var allMatches = this.getMatches();
    
  }

}
