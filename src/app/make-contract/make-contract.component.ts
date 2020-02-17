import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Commonservices } from '../app.commonservices';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-make-contract',
  templateUrl: './make-contract.component.html',
  styleUrls: ['./make-contract.component.css'],
  providers: [Commonservices]
})
export class MakeContractComponent implements OnInit {
  public makeContentForm:FormGroup;
  public datalist: any;
  public recid: any;
  public issubmit = 0;
  public editorconfig: any = {};

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    protected _sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    public _commonservice:Commonservices,
    public cookeiservice:CookieService,
    public _http: HttpClient 
  ) {

    this.editorconfig.extraAllowedContent = '*[class](*),span;ul;li;table;td;style;*[id];*(*);*{*}';

    this.makeContentForm = this.formBuilder.group({
      clauses: ['', Validators.required],
      notesMsg:['']
    });
    this.route.params.subscribe(params => {
      this.recid = params['_id'];
      // console.log(this.recid);
    });
   }

  ngOnInit() {

    this.route.data.forEach((data:any ) => {
      // console.log('json',data.results.res);
      this.datalist = data.results.res[0];
    if (this.datalist.clauses != null && this.datalist.clauses != '') {
      this.makeContentForm.controls['clauses'].patchValue(this.datalist.clauses);
      this.makeContentForm.controls['notesMsg'].patchValue(this.datalist.notesByCM);
    }

    // console.log('json',this.datalist.contentTop);
   });
  }


  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }


  makeContentFormSubmit() {
    this.issubmit = 1;
    let x: any;
    for (x in this.makeContentForm.controls) {
      this.makeContentForm.controls[x].markAsTouched();
      // console.log(this.makeContentForm.controls[x].valid);
    }
    // console.log('sdf',this.makeContentForm.value)

    if (this.makeContentForm.controls[x].valid && this.datalist != null && this.datalist != '' &&( this.datalist.status == 'request' || this.datalist.status == 'ask_for_modification')) {
     
      let data:any= {
        id:this.recid,
        notes: this.datalist.notes,
        notesByCM:this.makeContentForm.value.notesMsg,
        notesByCM_date: Date.now(),
        clauses: this.makeContentForm.value.clauses,
        status: 'send_to_rep',
        rep_id: this.datalist.rep_id,
        rep_email: this.datalist.rep_email,
        product: this.datalist.product,
        product_id: this.datalist.product_id,
        lead_id: this.datalist.lead_id,
        contract_manager_id: this.cookeiservice.get('userid'),
        contentTop: this.datalist.contentTop,
        contentBottiom: this.datalist.contentBottiom,
        contract_content_notes: this.datalist.contract_content_notes
      }
      const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link,  { source: 'contract_repote', data: data}).subscribe((res:any)=>{
          if (res.status == "success") {
            this.router.navigateByUrl('/contract-manager-list')
          }
        });
    }else {
      let data:any= {
        id:this.recid,
        notes: this.datalist.notes,
        ModifiedNotesByRep:this.makeContentForm.value.notesMsg,
        ModifiedByRep_date: Date.now(),
        clauses: this.makeContentForm.value.clauses,
        status: 'ask_for_modification',
        rep_id: this.datalist.rep_id,
        rep_email: this.datalist.rep_email,
        product: this.datalist.product,
        product_id: this.datalist.product_id,
        lead_id: this.datalist.lead_id,
        // contract_manager_id: this.cookeiservice.get('userid'),
        contentTop: this.datalist.contentTop,
        contentBottiom: this.datalist.contentBottiom,
        contract_content_notes: this.datalist.contract_content_notes,
        contract_manager_id: this.datalist.contract_manager_id
      }
      const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link,  { source: 'contract_repote', data: data}).subscribe((res:any)=>{
          if (res.status == "success") {
            // this.sendEmail(data);
            this.router.navigateByUrl('/contract-manager-list')
          }
        });
    }
  }
  // send_to_lead(val){
  //   console.log(val.value)
  // }
  sendToLead(){
    // console.log(this.datalist)
      const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
      this._http.post(link,  { source: 'contract_repote', data: {
       id: this.datalist._id,
       notes: this.datalist.notes,
       notesByCM:this.datalist.notesByCM,
       status:'send_to_lead',
       product: this.datalist.product,
       product_id: this.datalist.product_id,
       lead_id:this.datalist.lead_id,
       contract_manager_id: this.datalist.contract_manager_id,
       rep_id:this.datalist.rep_id,
       updated_by: this.cookeiservice.get('userid')
        }})
          .subscribe((res: any) => { 
              if (res.status == 'success') {
                console.log('+++++++++')
              this.router.navigateByUrl('/contract-manager-list');
          }
          });
    }
  // sendEmail(item: any) {
  //   const link = this._commonservice.nodesslurl + 'send_for_rep_mail';
  //   this._http.post(link,  {data: item}).subscribe((res:any)=>{
  //     console.log(res);
  // });
  // }

// contractRepote(id){
  
// }

}
