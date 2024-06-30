import { Component, Inject, OnInit } from '@angular/core';
import { IPokemonListResponse, IPokemonListResult } from 'src/app/shared/interfaces';
import { PokemonService } from 'src/app/shared/services/pokemon/pokemon.service';
import { EventService } from 'shell/EventService';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonsToShow: IPokemonListResult[] = [];
  itemsPerPage = 9;
  currentPage = 1;
  pokemons: IPokemonListResult[] = [];
  pokemonsAuxiliar: IPokemonListResult[] = [];
  maximumPagination: boolean = false;

  constructor(
    private _pokemonService: PokemonService,
    @Inject('EVENT_SERVICE') private _eventService: EventService,
  ) {}

  ngOnInit(): void {
    this.getAllPokemons();
    this.listenForInputSearchChange();
  }

  listenForInputSearchChange() {
    this._eventService
      .searchInputChange$
      .subscribe(search => this.onSearchInputSuccess(search))
  }

  private onSearchInputSuccess(search: string): void {
    this.pokemons = [...this.pokemonsAuxiliar.filter(pokemon => pokemon.name.includes(search))];
    this.currentPage = 1;
    this.handleMaxPagination();
    this.displayItems(this.currentPage);
  }

  private getAllPokemons() {
    this._pokemonService
      .getAll()
      .subscribe(pokemonsResponse => this.onSuccesGetAllPokemons(pokemonsResponse))
  }

  private onSuccesGetAllPokemons(pokemonsResponse: IPokemonListResponse): void {
    this.pokemonsAuxiliar = pokemonsResponse.results;
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
  
    this.pokemonsToShow = [...itemsToDisplay];
  }
  
  handleNext() {
    const totalPages = this.getTotalPages();
    if (this.currentPage < totalPages) {
      this.currentPage = this.currentPage + 1;
      this.maximumPagination = false;
      this.displayItems(this.currentPage);
    } 

    this.handleMaxPagination();
    
  }

  getTotalPages() {
    const totalPages = Math.ceil(this.pokemons.length / this.itemsPerPage);
    return totalPages;
  }

  handleMaxPagination() {
    const totalPages = this.getTotalPages();
    if(this.currentPage >= totalPages) {
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
