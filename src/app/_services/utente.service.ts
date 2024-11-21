import { Injectable } from '@angular/core';
import { Utente } from '../_models/utente';
import { HttpClient } from '@angular/common/http';
import { Subject, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  refreshListEvent : Subject<any> = new Subject();
  editEvent: Subject<any> = new Subject();

  list: Array<Utente> = [];

  constructor(private httpClient:HttpClient, private authService: AuthService) { 

    console.log ("provo a chiamare l'api");

    let apiURL = "http://localhost:8080/utenti";

    this.refreshListEvent.pipe(
      
      switchMap(response => {
        let jwt = this.authService.token;
        return this.httpClient.get(apiURL, {
          headers:{
            'Authorization':`Bearer ${jwt}`
          }
        });
      })
    ).subscribe(e => {

        console.log(e);
        console.log('lista ottenuta');

        let responseList: Array<Utente> = e as Array<Utente>;
        this.list = responseList;
      });

      this.refreshListEvent.next({});

    }

    edit(obj: Utente){
      this.editEvent.next(obj);
    }

    update(obj : Utente){
      let jwt = this.authService.token;
      let apiURL: string = `http://localhost:8080/utenti/${obj.id}`;

      this.httpClient.put(apiURL, obj,{
        headers:{
          'Authorization': `Bearer ${jwt}`
            }
      }).subscribe(response =>{

        console.log(response);
        console.log('risposta dal server');
        this.refreshListEvent.next({});
      })
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
