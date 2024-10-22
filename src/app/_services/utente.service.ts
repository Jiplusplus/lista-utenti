import { Injectable } from '@angular/core';
import { Utente } from '../_models/utente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  list: Array<Utente> = [];

  constructor(private httpClient:HttpClient) { 

    console.log ("provo a chiamare l'api");

    let apiURL = "http://localhost:8080/utenti";

    this.httpClient.get(apiURL).subscribe(response =>{

      console.log("ricevuta risposta dal server");
      console.log(response);
      let responseList: Array<Utente> = response as Array<Utente>;
      this.list = responseList;

    });

    let content = localStorage.getItem('lista_utenti');
    if (content) {
      this.list = JSON.parse(content);
    }

  }

  saveToStorage() {

    //localStorage.setItem('lista_utenti', JSON.stringify(this.list));
  }
}
