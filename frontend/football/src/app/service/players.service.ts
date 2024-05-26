import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json; charset=utf-8'
        }
      )
    }
    return this.http.get<any>("http://localhost:8000/football/players/", httpOptions);
  }

  getAllPlayers(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json; charset=utf-8'
        }
      )
    }
    return this.http.get<any>("http://localhost:8000/publicAPI/", httpOptions);
  }

  getPlayer(ID: any): Observable<any> {
    const httpOptions = {
      params: new HttpParams().set('ID', ID),
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json; charset=utf-8'
        }
      )
    }
    const url = "http://localhost:8000/football/players/" + ID;
    return this.http.get<any>(url, httpOptions);
  }

  postPlayer(player: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json; charset=utf-8'
        }
      )
    }
    return this.http.post<any>("http://localhost:8000/football/players/", player, httpOptions);
  }
}
