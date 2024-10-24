import { Injectable } from '@angular/core';
import { Utente } from '../_models/utente';
import { HttpClient } from '@angular/common/http';
import { Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  refreshListEvent : Subject<any> = new Subject();

  list: Array<Utente> = [];

  constructor(private httpClient:HttpClient) { 

    console.log ("provo a chiamare l'api");

    let apiURL = "http://localhost:8080/utenti";

    this.refreshListEvent.pipe(
      switchMap(response => {
        return this.httpClient.get(apiURL);
      })
    ).subscribe(e => {

        console.log(e);
        console.log('lista ottenuta');

        let responseList: Array<Utente> = e as Array<Utente>;
        this.list = responseList;
      });

      this.refreshListEvent.next({});

    }

  save(obj: Utente){
    let apiURL: string = 'http://localhost:8080/utenti';
    this.httpClient.post(apiURL, obj).subscribe(resposne => {

      console.log(resposne);
      console.log('risposta dal server');
      this.refreshListEvent.next({});
    })
  }
}
