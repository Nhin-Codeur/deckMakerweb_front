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
      
    }
  }

  public saveDeck() {
    console.log(this.deck.map(x => x["id"]))
    this.apiService.saveDeck(this.deck.map(x => x["id"]), this.current_deck_name).subscribe(this.affiche_resultat_requete)
  }

  public searchCard() {
    this.apiService.getCard(this.current_card).subscribe((response: any) => this.all_results = response.cards);
  }

  public afficherDecks() {
    this.apiService.getDecks().subscribe((response: any) => console.log(response))

  }

} 
