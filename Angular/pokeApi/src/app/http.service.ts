import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getApi();
   }
   getApi(){
     const tempObservable = this._http.get('https://pokeapi.co/api/v2/pokemon/150/');
     tempObservable.subscribe(<Object>(data) => {
      console.log("Got Mewtwo!", data);
      console.log('Mewtwo has the ability '+ data.abilities[1].ability.name+ ' and '+ data.abilities[0].ability.name);
      let newObservable = data.abilities[1].ability.url;
      const other_pokemon = this._http.get(newObservable);
      other_pokemon.subscribe(<Object>(result) => {
        console.log(result.pokemon.length -1 + ' other pokemon also have ' + data.abilities[1].ability.name + ' as their ability')
      })
     })
   }
}

