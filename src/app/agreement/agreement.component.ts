import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Commonservices } from '../app.commonservices';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css'],
  providers: [Commonservices]
})
export class AgreementComponent implements OnInit {

  modalref:BsModalRef;
  /* Digital Sign */
  public degitalSignForm: FormGroup;
  public degitalSignFormSubmitFlug: boolean = false;

  /* Agreement Form */
  public agreementForm: FormGroup;
  public agreementFormSubmitFlug: boolean = false;

  public userDetails: any = {};
  public today: any = new Date;

  constructor( public _commonservice: Commonservices, public router: Router,
                private activateRoute: ActivatedRoute, public _http: HttpClient,
                public modalservices: BsModalService, public cookeiservice: CookieService,
                public sanitizer: DomSanitizer, private formBuilder: FormBuilder ) {
    
    /* Geting User Data */
    this.activateRoute.params.subscribe(params => {
      if(params['userId']) {
        this.getUserDetails(params['userId']);
      } else {
        this.getUserDetails(this.cookeiservice.get('userid'));
      }
    });

    /* Digital Sign Form Control */
    this.degitalSignForm = this.formBuilder.group({
      fullName:   [ null, [ Validators.required, Validators.maxLength(150) ] ],
    });

    /* Agreement Form Control */
    this.agreementForm = this.formBuilder.group({
      companyName:  [ null, [ Validators.maxLength(150) ] ],
      address:      [ null, [ Validators.required, Validators.maxLength(1000) ] ],
      fullName:     [ null, [ Validators.required, Validators.maxLength(1000) ] ],
      signature:    [ null, [ Validators.required, Validators.maxLength(150) ] ]
    });
  }

  ngOnInit() {
  }

  /* Get User Details by userID */
  getUserDetails(userId) {
    const postLink = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
    const postData: any = { source:'users', condition: { _id_object: userId } };
    this._http.post(postLink, postData).subscribe(responce => {
      this.userDetails = responce;
      this.userDetails = this.userDetails.res[0];

      /* Set Default Value */
      this.agreementForm.patchValue({
        companyName:  this.userDetails.companyname,
        address:      this.userDetails.address,
        fullName:     this.userDetails.firstname + ' ' + this.userDetails.lastname
      });
    });
  }

  /* Digital Sign Form Submit */
  degitalSignFormSubmit() {
    this.degitalSignFormSubmitFlug = true;
    if(this.degitalSignForm.valid) {
      /* Set Default Value */
      this.agreementForm.patchValue({
        signature: this.degitalSignForm.value.fullName
      });
      this.modalref.hide();
      this.degitalSignForm.reset();
    }
  }

  /* Hide modal */
  hideDigitalSignModal() {
    this.modalref.hide();
  }

  /* Agreement Form Submit */
  agreementFormSubmit() {
    this.agreementFormSubmitFlug = true;
    if(this.agreementForm.valid) {
      const postLink = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
      const postData: any = { 
                              source:'users',
                              data: { id: this.userDetails._id, is_contract_signed: 1, contract_signed_date: this.today, contract_signature: this.agreementForm.value.signature }
                            };
      this._http.post(postLink, postData).subscribe(responce => {
        let result: any = responce;
        if(result.status == 'success') {
          /* Set cookie */
          this.cookeiservice.set('lockdornot', this.userDetails.lock);
          this.cookeiservice.set('usertype', this.userDetails.type);
          this.cookeiservice.set('useremail', this.userDetails.email);
          this.cookeiservice.set('fullname', this.userDetails.firstname + ' ' + this.userDetails.lastname);

          this.router.navigate(['/repdashboard']);
        }
      });
    } else {
      console.log('Error');
    }
  }

  /* Open Modal */
  openModal(template:TemplateRef<any>) {
    this.modalref = this.modalservices.show(template, {class: 'signmodal'});
  }

}
