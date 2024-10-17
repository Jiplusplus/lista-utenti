import { Component, ElementRef, ViewChild } from '@angular/core';
import { Utente } from '../_models/utente';
import { UtenteService } from '../_services/utente.service';
import { FormsModule } from '@angular/forms';
import { ListaComponent } from '../lista/lista.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, FormComponent, ListaComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @ViewChild('form1')
  form!: ElementRef<HTMLFormElement>;

  current: Utente = {
    id: '',
    username: '',
    password: ''
  };

  constructor(private service: UtenteService) {

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

        this.service.saveToStorage();
      }
    }


  }

}
