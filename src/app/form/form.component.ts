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
    
    this.service.editEvent.subscribe((e:Utente)=>{

      this.current.id = e.id;
      this.current.username = e.username;
      this.current.password = e.password;

    });
  }

  save() {

    this.form.nativeElement.classList.add('was-validated');

    if (this.form.nativeElement.checkValidity()) {

      console.log(`id=${this.current.id}, check=${this.current.id != ''}`);
      if(this.current.id != ''){      
        this.service.update(this.current);
      }
      else{
        this.service.save(this.current);
      }
    }
  }
}
