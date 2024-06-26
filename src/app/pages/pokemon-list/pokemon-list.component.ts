import { Component } from '@angular/core';
import { PokemonService } from 'src/app/shared/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {

  constructor(private _pokemonService: PokemonService) {}

  
}
