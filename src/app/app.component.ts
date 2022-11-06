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

  constructor(private apiService: ApiService) {}


  public addCard(card:any) {
    this.deck.push(card)
    console.log(this.deck)
  }

  public searchCard() {
    this.apiService.getCard(this.current_card).subscribe((response: any) => this.all_results = response.cards);
  }
} 
