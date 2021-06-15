import { Component, OnInit, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";
import { ActivatedRoute, Router } from "@angular/router";

import { UserSpecialityService } from "../../../services/user-speciality.service";
import { UtilitiesService } from "../../../services/utilities.service";

@Component({
  selector: "ngx-delete-user-speciality",
  templateUrl: "./delete-user-speciality.component.html",
  styleUrls: ["./delete-user-speciality.component.scss"],
})
export class DeleteUserSpecialityComponent implements OnInit {
  @Input() dataObject: any;
  current_payload: string = null;
  submitted: boolean = false;
  idItemData: any = null;
  userSpeciality: any = {};

  constructor(
    private userSpecialityService: UserSpecialityService,
    private utilitiesService: UtilitiesService,
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<DeleteUserSpecialityComponent>
  ) {}

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      console.log("token: ", token);
      if (token.isValid()) {
        // // here we receive a payload from the token and assigne it to our `user` variable
        this.current_payload = token.getValue();
        console.log("this.current_payload: ", this.current_payload);
        console.log("this.dataObject: ", this.dataObject);
        this.idItemData = this.dataObject["_id"];
        this.userSpeciality = this.dataObject;
        console.log("this.idItemData: ", this.idItemData);
      } else {
        this.utilitiesService.fnDestroySession();
      }
    });
  }

  fnDeleteData(deleteDataForm) {
    console.log('deleteDataForm: ', deleteDataForm);
    console.log('this.userSpeciality: ', this.userSpeciality);
    this.submitted = true;
    this.userSpecialityService.fnHttpSetDeleteUserSpeciality(this.userSpeciality, this.idItemData).subscribe(resp => {
      console.log('resp: ', resp);
      setTimeout(() => {
        this.utilitiesService.showToast('top-right', 'success', 'El Especialista ha sido eliminado satisfactoriamente!');
        this.submitted = false;
        this.userSpeciality = {};
        this.dismiss(resp);
      }, 2000);
    }, error => {
      this.utilitiesService.showToast('top-right', 'danger', 'Ha ocurrido un error, intentalo nuevamente!');
      this.submitted = false;
      console.log('error: ', error);
    });
  }

  dismiss(res?) {
    this.ref.close(res);
  }

  fnCancelDeleteData() {
    this.submitted = false;
    this.dismiss();
  }
}
