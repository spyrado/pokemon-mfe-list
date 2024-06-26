import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  
  @Input() set pokemonNumber(number: number) {
    this.formattedNumber = this.formatNumber(number);
  };
  @Input() pokemonName?: string;

  public formattedNumber?: string;

  constructor() {}

  formatNumber(numero: number): string {
    if (numero > 0 || numero < 99) {
      return numero.toString().padStart(3, '0');
    } else {
      return numero?.toString();
    }
  
  }
}
