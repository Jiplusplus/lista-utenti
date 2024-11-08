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
        let jwt = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlbjhTWG1KeVpteHlaOU81LUs3UE40SzdVRHB5MEJ1WVhJZmZZQ2wtQ0RVIn0.eyJleHAiOjE3MzEwNzM3MTIsImlhdCI6MTczMTA3MzQxMiwianRpIjoiZjkyMGIxYWUtNTU4Yy00N2E5LThmOGQtMTYwOWE4NmYyZDk2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDkwL3JlYWxtcy9hcGlfdXRlbnRpIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImM2NTg3ODc1LTAwZDItNDNhZi1iYzJkLTE2MWY0YTIzYTk5YSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJhY2tlbmRfdXRlbnRpIiwic2lkIjoiMmU4ZDgwOWYtMzMwYi00ZmYzLTkzMjgtZDRmYjFiZWVlZDRhIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1hcGlfdXRlbnRpIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6InVzZXIgdW5vIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidXNlcjEiLCJnaXZlbl9uYW1lIjoidXNlciIsImZhbWlseV9uYW1lIjoidW5vIiwiZW1haWwiOiJ1c2VyMUBnbWFpbC5jb20ifQ.JtRuOdAMSw8Gw4fzqXG1-CqODOUiO3WVsNfF9P142WkQMboBJqu2FcXA4TgzGnw1UI56ZdJOhaUCXC3LTIzu3zE2FAWwh3c4EJwRPy1jRO2NR2qhRqwhjgrvg3ru_AmXJZ3bEMPBndnRUkq__9qdqZkS3e7uvaaIT0yhHePpoemDj5xnj0cIIBEnKNgDFtJsj9Ad4dYPZ4zb9sDSPTqGJx7Xjh8LL1L0K4JrRMPEpDE94yQBJ9r_kvoV5BJpG1gPd1r6GYUK8fu-1Vdbb0gF_GB7eaZGXR4uXf9f4wYmHSsnBpDfa4OCf3AeTRsLRPYQcbVW55UGrVknEzA5CrXJXw';
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

  save(obj: Utente){
    let apiURL: string = 'http://localhost:8080/utenti';
    this.httpClient.post(apiURL, obj).subscribe(resposne => {

      console.log(resposne);
      console.log('risposta dal server');
      this.refreshListEvent.next({});
    })
  }
}
