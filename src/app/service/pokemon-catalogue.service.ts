import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Pokemon } from '../models/pokemon.model';
import { Data } from '../models/data.model';
import { SessionUtil } from '../utils/session.util';
//const {apiPokemon}= environment;
const {apiPokemon}=environment;
@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {
private _pokemons: Pokemon[]= [];
private _error: string="";
private _loading: boolean =false;
get pokemons(): Pokemon[]{
  return this._pokemons;
}
get error(): string{
  return this._error;
}
get loading():boolean{
  return this._loading;
}

  constructor(private readonly http: HttpClient) { }

  /* loads the pokemons from the api */
  public findAllPokemons(): void {
    if(this._pokemons.length>0 || this.loading){
      return;
    }
    this._loading=true;
    this.http.get<Data>(apiPokemon)
    .pipe(
      
     finalize(()=>{        // when is done,
      this._loading=false; // end the loading... message
     }
     )
     
    )
    .subscribe({
      next: (data: Data) => {
        
        this._pokemons = data.results; //passing the pokemon list
        
        SessionUtil.storageSave("collection", data.results); //saving the pokemon list into session storage

      },
      error: (error: HttpErrorResponse) => {  //if an error occures
        this._error=error.message;            //pass the error message
      }
    })
  }

  /* loading pokemons from session storage */
  public pokemonsFromSession(data: Pokemon[] | undefined): void {
    this._loading=true;

    if (data !== undefined){  //if data exists
      this._pokemons = data;  //pass the data to pokemons
    }

    this._loading=false;
  }

  /* searching if a pokemon exists by his name and returns the pokemon or undefined if pokemon does not exists*/
  public pokemonByName(PokemonName: string): Pokemon | undefined{
    return this._pokemons.find((pokemon: Pokemon)=> pokemon.name===PokemonName) 

  }
}
