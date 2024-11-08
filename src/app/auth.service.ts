import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = '';
  expToken : Date = new Date();
  refreshToken: string =  '';
  expRefreshToken : Date = new Date();

  constructor(private httpClient: HttpClient) { 
    this.token = localStorage.getItem('access_token') ?? '';
    this.refreshToken = localStorage.getItem('refresh_token') ?? '';

    let strExpToken = localStorage.getItem('exp_token');
    if(strExpToken){
      this.expToken = new Date(parseInt(strExpToken));
    }

    let strExpRefrashToken = localStorage.getItem('exp_refresh_token');
    if(strExpRefrashToken){
      this.expRefreshToken = new Date(parseInt(strExpRefrashToken));
    }
  }

  login(username: string, password: string): Observable<any>{

    let url = 'http://localhost:8090/realms/api_utenti/protocol/openid-connect/token';
    let body = new HttpParams()
    .set('client_id', 'backend_utenti')
    .set('client_secret', 'MLgsEDd0Mh5zJh11yOhRfHO6niQJvjJq')
    .set('grant_type', 'password')
    .set('scope', 'openid')
    .set('username', username)
    .set('password', password)
    ;

    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.httpClient.post(url, body, {headers}).pipe(

      tap((response:any) => {
        console.log(response);
        this.token = response.access_token;
        this.expToken = new Date(new Date().getTime() + response.expires_in * 1000); 
        this.refreshToken = response.refreshToken;
        this.expRefreshToken = new Date(new Date().getTime() + response.refresh_expires_in * 1000);   

        console.log(this.expToken);

        localStorage.setItem('access_token', this.token);
        localStorage.setItem('exp_token', this.expToken.getTime().toString());
        localStorage.setItem('refresh_token', this.refreshToken);
        localStorage.setItem('exp_refresh_token', this.expRefreshToken.getTime().toString());
      })
    );
  }

  checkToken(){

    
    return this.token.length > 0 && this.expToken > new Date();
  }

}
