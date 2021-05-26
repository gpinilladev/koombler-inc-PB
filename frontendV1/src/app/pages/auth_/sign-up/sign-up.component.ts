import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public user: any;
  public errorState: boolean = false;
  public errorMessage: string = '';

  constructor() {
    this.user = new Usuario('', '', '', '', '', '', '', '', '', 0);
  }

  ngOnInit(): void {
  }

  fnSignUp(dataForm: NgForm) {
    // console.log('dataForm: ', dataForm);
    // console.log('dataForm.valid: ', dataForm.valid);
    // console.log('dataForm.invalid: ', dataForm.invalid);
    if (dataForm.valid) {
      console.log('dataForm.valid: ', dataForm.valid);
      if (this.user.email !== this.user.emailConfirm) {
        console.log('this.user: ', this.user);
        this.errorState = true;
        this.errorMessage = 'Error, el email y su confirmacion son diferentes!';
      }
    }

  }

}