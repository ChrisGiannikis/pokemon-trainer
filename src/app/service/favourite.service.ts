import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { UserServiceService } from './user-service.service';

const {apiKey, apiUsers} = environment;

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
private _loading: boolean =false;
get loading(): boolean{
  return this._loading;
}
  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonCatalogueService,
    private readonly  userService: UserServiceService
  ) { }

  public addToFavourites(PokemonName: string): Observable<Trainer> {
    if(!this.userService.user){            //checking if user exists
      throw new Error("There is no user"); //user does not exists and throwing error
      
    }
    const user: Trainer =this.userService.user;
    const pokemon : Pokemon | undefined = this.pokemonService.pokemonByName(PokemonName); //checking if exists this pokemon
    if(!pokemon){                                                                         //if pokemon does not exists
      throw new Error("No pokemon with name:" + PokemonName);                             //throw error
      
    }

    if(this.userService.inFavourites(PokemonName)){       //if this pokemon is at trainers colection
      this.userService.removeFromFavourites(PokemonName); //removes the current pokemon from trainers collection
    }else                                                 //this pokemon is not at trainers colection
    this.userService.addToFavourites(pokemon);           //adds the current pokemon to trainers collection

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey
    })

      this._loading=true; //starts the loading... message
      

    return this.http.patch<Trainer>(`${apiUsers}/${user.id}`,{
      pokemon:[...user.pokemon] //adding the pokemon to trainers collection
    },{
      headers
    })
    .pipe(
      tap((updatedUser: Trainer)=>{
        this.userService.user=updatedUser;  //updates the user
      }),
      finalize(() => {
        this._loading = false; //ends the loading... message
      })
    )

  }
}
