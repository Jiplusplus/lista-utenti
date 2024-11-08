import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  current: any ={
    username: '',
    password: ''
  };

  constructor(private authService : AuthService, private router: Router){

  }

  login(){
    console.log(this.current);
    this.authService.login(this.current.username, this.current.password).subscribe((response) =>{
    console.log('ritorno dal service');
    console.log(response);

    this.router.navigateByUrl('/');
  });
  }

}
