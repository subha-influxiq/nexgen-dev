import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap';
import { Commonservices } from '../app.commonservices';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-lead-contract',
  templateUrl: './lead-contract.component.html',
  styleUrls: ['./lead-contract.component.css'],
  providers: [Commonservices]
})
export class LeadContractComponent implements OnInit {
public all_data: any;
public modalref: any
public today: any = new Date;
public degitalSignForm: FormGroup;
public degitalSignFormSubmitFlug: boolean = false;
public agreementForm: FormGroup;
public agreementFormSubmitFlug: boolean = false;
  constructor(
    public route: ActivatedRoute,
    protected _sanitizer: DomSanitizer,
    public modalservices: BsModalService,
    public formBuilder: FormBuilder,
    public _http:HttpClient,
    public router: Router,
    public cookeiservice: CookieService,
    public _commonservice:Commonservices) { }

  ngOnInit() {
    this.route.data.forEach((data:any ) => {
      console.log(data.results.res[0]);
      this.all_data = data.results.res[0];
   });

   this.degitalSignForm = this.formBuilder.group({
    fullName:   [ null, [ Validators.required, Validators.maxLength(150) ] ],
  });
  }
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  /* Open Modal */
  openModal(template:TemplateRef<any>) {
    this.modalref = this.modalservices.show(template, {class: 'signmodal'});
  }

  degitalSignFormSubmit() {
    this.degitalSignFormSubmitFlug = true;
    if(this.degitalSignForm.valid) {
      /* Set Default Value */
      console.log(this.degitalSignForm.value.fullName)

      const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
      this._http.post(link,  { source: 'contract_repote', data: {
       id: this.all_data._id,
       notes: this.all_data.notes,
       notesByCM:this.all_data.notesByCM,
       status:'sends_Signed_Contract_to_Rep',
       product: this.all_data.product,
       product_id: this.all_data.product_id,
       lead_id:this.all_data.lead_id,
       lead_digital_signature:this.degitalSignForm.value.fullName,
       lead_digital_signature_date:new Date().getTime(),
       contract_manager_id: this.all_data.contract_manager_id,
       rep_id:this.all_data.rep_id,
       updated_by: this.cookeiservice.get('userid')
        }})
          .subscribe((res: any) => { 
              if (res.status == 'success') {
              this.router.navigateByUrl('/contract-manager-list');
          }
          });

      this.modalref.hide();
      this.degitalSignForm.reset();
    }
  }
  hideDigitalSignModal() {
    this.modalref.hide();
  }

}
