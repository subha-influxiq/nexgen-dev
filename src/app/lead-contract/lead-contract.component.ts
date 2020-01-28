import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap';
import { Commonservices } from '../app.commonservices';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    public formBuilder: FormBuilder) { }

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
      this.agreementForm.patchValue({
        signature: this.degitalSignForm.value.fullName
      });
      console.log(this.degitalSignForm.value.fullName)
      this.modalref.hide();
      this.degitalSignForm.reset();
    }
  }
  hideDigitalSignModal() {
    this.modalref.hide();
  }

}
