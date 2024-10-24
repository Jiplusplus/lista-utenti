import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Utente } from '../_models/utente';
import { UtenteService } from '../_services/utente.service';
import { FormComponent } from '../form/form.component';
import { ListaComponent } from '../lista/lista.component';

@Component({
  selector: 'app-form-editing',
  standalone: true,
  imports: [FormsModule, FormComponent, ListaComponent],
  templateUrl: './form-editing.component.html',
  styleUrl: './form-editing.component.css'
})
export class FormEditingComponent {

  @ViewChild('form1')
  form!: ElementRef<HTMLFormElement>;

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

  save() {

    this.form.nativeElement.classList.add('was-validated');

    if (this.form.nativeElement.checkValidity()) {

      let o = this.service.list.find(e => e.id == this.current.id);
      if (o) {
        o.username = this.current.username;
        o.password = this.current.password;
      } else {
        this.service.list.push({
          id: this.current.id, 
          username: this.current.username, 
          password: this.current.password
        });

        //this.service.saveToStorage();
      }
    }


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
