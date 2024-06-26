import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPokemonListResponse, IPokemonListResult } from 'src/app/shared/interfaces';
import { PokemonService } from 'src/app/shared/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonsToShow: IPokemonListResult[] = [];
  itemsPerPage = 15;
  currentPage = 1;
  pokemons: IPokemonListResult[] = [];
  maximumPagination: boolean = false;

  constructor(private _pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getAllPokemons();
  }

  private getAllPokemons() {
    this._pokemonService
      .getAll()
      .subscribe(pokemonsResponse => this.onSuccesGetAllPokemons(pokemonsResponse))
  }

  private onSuccesGetAllPokemons(pokemonsResponse: IPokemonListResponse): void {
    this.pokemons = pokemonsResponse.results;
    this.displayItems(this.currentPage);
  }

  getPokemonNumber(pokemonResult: IPokemonListResult) {
    return this.getLastNumber(pokemonResult.url);
  }

  getLastNumber(url: string) {
    const match = url.match(/\/(\d+)\//);
    return match ? parseInt(match[1]) : 0;
  }

  displayItems(currentPage: number) {
    const startIndex = (currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const itemsToDisplay = this.pokemons.slice(startIndex, endIndex);
  
    // const itemsContainer = document.getElementById('items');
    // itemsContainer.innerHTML = itemsToDisplay.map(item => `<p>${item}</p>`).join('');
    this.pokemonsToShow = [...itemsToDisplay];
  }
  
  handleNext() {
    const totalPages = Math.ceil(this.pokemons.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.maximumPagination = false;
      this.displayItems(this.currentPage);
    } 

    if(this.currentPage === totalPages) {
      this.maximumPagination = true;
    } else {
      this.maximumPagination = false;
    }
    
  }
  
  handlePrev() {
    this.maximumPagination = false;
    if (this.currentPage > 1) {
      this.currentPage--;
      this.displayItems(this.currentPage);
    }
  }


}
