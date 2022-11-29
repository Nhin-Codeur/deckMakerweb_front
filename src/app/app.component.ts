import { Component } from '@angular/core';
import { ApiService } from './services/api.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-appp';
  name = ""
  current_card:string = ""
  all_results = []
  deck : Array<any> = []
  current_deck_name : string = ""
  list_of_decks : Array<any> = []
  current_deck : any = {}

  constructor(private apiService: ApiService) {
    this.afficherDecks()
  }

  private affiche_resultat_requete(response:any){
    console.log(response)
  }

  

  private get_occurence(tab:any, id:number) {
    var i = 0
    tab.forEach((card:any) => {
      if (card['id'] == id ){
        i++
      }
    })
    return i

  } 

  

  public addCard(card:any) {
    if(this.get_occurence(this.deck, card['id']) < 2 && this.deck.length < 30 ) {
      this.deck.push(card)
      console.log(this.deck)
      
    }
  }

  public saveOrUpdateDeck() {
    if (Object.keys(this.current_deck).length == 0 ) {
      this.apiService.saveDeck(this.deck.map(x => x["id"]), this.current_deck_name).pipe((response: any) => {this.afficherDecks() ; return response}).subscribe(this.affiche_resultat_requete)
      console.log("save")
    } else {
      console.log("update")
      this.current_deck["data"] = this.deck.map(x => x["id"])
      this.apiService.updateDeck(this.current_deck).pipe((response: any) => {this.afficherDecks() ; return response}).subscribe((response: any) => console.log(response))
    }
    this.current_deck = {}
    this.deck = []
    this.afficherDecks()
    
  }

  public searchCard() {
    this.apiService.getCard(this.current_card).subscribe((response: any) => this.all_results = response.cards);
  }

  public afficherDecks() {
    this.apiService.getDecks().subscribe((response: any) => this.list_of_decks = response)

  }

  public afficheCurrentdeck(entire_deck:any) {
    this.current_deck = entire_deck
    this.apiService.getCardById(entire_deck).subscribe((response: any) => this.deck = response.cards)
  }

  public supprimerCurrentdeck() {
    this.apiService.deleteDeck(this.current_deck["id"]).subscribe((response: any) => {
      this.current_deck = []
      this.deck = []
      this.afficherDecks()
    })
  }
} 
