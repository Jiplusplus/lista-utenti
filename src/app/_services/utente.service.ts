import { Injectable } from '@angular/core';
import { Utente } from '../_models/utente';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  list: Array<Utente> = [];

  constructor() { 

    let content = localStorage.getItem('lista_utenti');
    if (content) {
      this.list = JSON.parse(content);
    }

  }

  saveToStorage() {

    localStorage.setItem('lista_utenti', JSON.stringify(this.list));
  }
}
