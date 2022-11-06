import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = "https://us.api.blizzard.com/hearthstone/cards?locale=en_US&access_token=EU8PvqqI67mSJUWTTeYrKiGHxNxJldF0qE&textFilter=";

  constructor(private http: HttpClient) { 
  }


  



  public getCard(card_name:string){
    card_name = card_name.replace(' ','%20')
    let current_url = this.url + card_name
    return this.http.get(current_url)

    
  }
}
