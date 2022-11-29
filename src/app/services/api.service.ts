import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Deck } from '../types/deck.model';
import { CurrencyPipe } from '@angular/common';

@Injectable({ 
  providedIn: 'root'
})
export class ApiService {

  private url_hearthstone_api = "https://us.api.blizzard.com/hearthstone/cards?locale=en_US&access_token=EUQ3sli2wUYxjxQe5YEOabiej2H6HK0PhA";
  private ip_rafael = "http://78.203.42.218:27017"
  private ip_locale = "/api"

  constructor(private http: HttpClient) { 
  }

  public saveDeck(deck:Array<number>, current_deck_name:string) {
    const options = {headers: {'Content-Type' : 'application/json'}}
    return this.http.post<Deck>(this.ip_locale + "/deck" + "/" + current_deck_name, JSON.stringify(deck),options)
    
  }
  
  public updateDeck (deck_updated : Deck) {
    
    return this.http.post(this.ip_locale + "/updatedeck", deck_updated)
  }



  public getCard(card_name:string){
    card_name = card_name.replace(' ','%20')
    let current_url = this.url_hearthstone_api + "&textFilter=" + card_name
    return this.http.get(current_url)

    
  }

  public getDecks(){
    return this.http.get(this.ip_locale + "/decks")
  }

  public getCardById(entire_deck:any){
    return this.http.get(this.url_hearthstone_api + "&id=" + entire_deck.data.toString())
  }

  public deleteDeck(deckId:number){
    return this.http.delete(this.ip_locale + "/deletedeck?deckId=" + deckId)
  }
}
