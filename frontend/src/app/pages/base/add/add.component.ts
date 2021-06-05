import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @Input() dataObject: any;
  current_payload: string = null;
  submitted: boolean = false;

  constructor(
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<AddComponent>,
  ) { }

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      console.log('token: ', token);
      if (token.isValid()) {
        // // here we receive a payload from the token and assigne it to our `user` variable
        // this.current_payload = token.getValue();
        // // here we change the current token for the company token
        // this.current_payload = this.company_payload;
      }
    });
  }

  fnAddData(addDataForm) {
    console.log('addDataForm: ', addDataForm);

  }

  dismiss(res?) {
    this.ref.close(res);
  }

  fnCancelAddData() {
    this.submitted = false;
    this.dismiss();
  }

}
