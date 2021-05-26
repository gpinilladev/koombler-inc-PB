import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  // Variable de user
  public user: any;
  // Variable token 
  public token: any;
  // Variable identity
  public identity: any;
  // Variable errores
  public errores: any;

  constructor() { }

  ngOnInit(): void {
  }

  login(loginForm: any) {
    console.log('loginForm: ', loginForm);
  }

  cerrarError () {
    setTimeout(() => {
      this.errores = '';
    }, 3000);
  }

}
