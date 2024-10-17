import { Component } from '@angular/core';
import { Utente } from '../_models/utente';
import { UtenteService } from '../_services/utente.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  current: Utente = {
    id: '',
    username: '',
    password: ''
  };
  constructor(private service: UtenteService) {

  }
  get list() {
    return this.service.list;
  }
  remove(item: Utente) {

    console.log(`eliminazione utente ${item.id}`);

    let idx = this.service.list.findIndex(e => e.id == item.id);
    if (idx > -1) {

      this.service.list.splice(idx, 1);
    }
  }

  update(item : Utente) {

    this.current = item;

//    this.current.id = item.id;
//    this.current.username = item.username;
//    this.current.password = item.password;
  }
}
