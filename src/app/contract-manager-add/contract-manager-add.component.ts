import { Component, OnInit,TemplateRef, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Commonservices } from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CookieService } from 'ngx-cookie-service';
import { WINDOW } from '@ng-toolkit/universal';

declare var moment:any;
@Component({
  selector: 'app-contract-manager-add',
  templateUrl: './contract-manager-add.component.html',
  styleUrls: ['./contract-manager-add.component.css'],
  providers: [Commonservices]
})
export class ContractManagerAddComponent implements OnInit {


 public allslots;
  public timezoneval:any;
  public recid:any;
  public refreshtoken:any;
  public timezone:any=[];
  public filterval5:any;
  public blockHeaderFooterBlock: boolean = true;
   public headerText: any = {};
   public slotval: any ;
   public slotView: boolean = false;

   public contractForm: FormGroup;
   public noticeForm: FormGroup;
   public medicalform:FormGroup;
   public contractFormSubmitFlug: boolean = false;
   public allcontract: any;
   public contractSuggestion: any = [];
   public contractSuggestionFlug: boolean = false;
   public leadname: any = [];
   public timeSpanView: boolean = false;
   public timeSpanVal: any = "15";
   public loader: boolean = false;
   public modalReference : BsModalRef;
   public selectedlead:any;
   public selectedproduct:any;
   public isedit_id:any ;
   

  constructor(@Inject(WINDOW) private window: Window, public _commonservice:Commonservices, private router: Router, public _http:HttpClient, public modal:BsModalService, public cookeiservice: CookieService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    window.scrollTo(1000,0);
    this._commonservice =_commonservice;


    /* Agreement Form Control */
    this.contractForm = this.formBuilder.group({
        product:      [ null, [ Validators.required, Validators.maxLength(200) ] ],
        lead:    [ "", [ Validators.required, Validators.maxLength(200) ] ],
      });
    this.noticeForm = this.formBuilder.group({
      notes: ['', Validators.required]
    });

     
  }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.recid = params['id'];


            if(this.cookeiservice.get('userid')) {
                if( this.recid != null) {
                    
                    this.getUserDetails(this.recid);
                }
                this.geteventarr();
            }
        });
    }

    requestContract(val: any) {
      console.log('requestContract is work', val);

      if (this.recid != null && this.isedit_id != null ) {
        const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link,  { source: 'contract_repote', data: {
            id: this.isedit_id,
         notes: val.notes,
         status:'request',
         rep_id:this.cookeiservice.get('userid'),
         product: this.contractForm.value.product,
         product_id: this.cookeiservice.get('product_id'),
         lead_id: this.contractForm.value.lead,
         updated_by: this.cookeiservice.get('userid')
          }})
            .subscribe((res: any) => { 
                if (res.status == 'success') {
                this.router.navigateByUrl('/contract-manager-list');
            }
            });
      } else {
        const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link,  { source: 'contract_repote', data: {
         notes: val.notes,
         status:'request',
         rep_id:this.cookeiservice.get('userid'),
         product: this.contractForm.value.product,
         product_id: this.cookeiservice.get('product_id'),
         lead_id: this.contractForm.value.lead,
          created_by: this.cookeiservice.get('userid')
          }})
            .subscribe((res: any) => { 
                if (res.status == 'success') {
                this.router.navigateByUrl('/contract-manager-list');
            }
            });
      }

    }
    saveAsDraft(val: any){
     console.log('saveAsDraft',val);
     if (this.recid != null && this.isedit_id != null ) {
        const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link, { source: 'contract_repote', data: {
          id: this.isedit_id,
          notes: val.notes,
          status:'asDraft',
          rep_id:this.cookeiservice.get('userid'),
          product: this.contractForm.value.product,
          product_id: this.cookeiservice.get('product_id'),
          lead_id: this.contractForm.value.lead,
          updated_by: this.cookeiservice.get('userid')
          }})
            .subscribe((res: any) => {
                if(res.status == 'success') {
                    this.router.navigateByUrl('/contract-manager-list');
                }
      });
     } else {
     // val.status = 'asDraft';
     const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
            this._http.post(link, { source: 'contract_repote', data: { notes: val.notes,
             status:'asDraft',
              rep_id:this.cookeiservice.get('userid'),
              product: this.contractForm.value.product,
              product_id: this.cookeiservice.get('product_id'),
              lead_id: this.contractForm.value.lead,
              created_by: this.cookeiservice.get('userid')
              }})
                .subscribe((res: any) => {
                    if(res.status == 'success') {
                        this.router.navigateByUrl('/contract-manager-list');
                    }
          });
        }
      console.log("saveAsDraft is work");
    }
   

    geteventarr(){
      console.log('geteventarr')
        let cond: any;
        switch(this.route.snapshot.url[0].path) {
            
            case 'add-contract-manager':

                if(!this.contractForm.valid) {
                    this.getcontract();
                    this.slotView = false;
                    return ;
                }else{
                    this.slotView=true;
                }
                console.log('slotview',this.slotView);
                this.headerText.hedaerH4 = 'Select your Closer Call Appointment as per your convenience.';
                this.headerText.span = 'Please select your Time Zone carefully to eliminate any confusion. Your scheduled appointment will be confirmed and mailed to you accordingly.';
                // this.cookeiservice.set('lead-product',this.contractForm.value.product);
               
                break;
            
            default:

            console.log('default');
        }
        
    }

//   /* Get user details */
  getUserDetails(id) {
    
      if(id!=null) {
          const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
          this._http.post(link, {source: 'contract_repote', condition: {_id_object: id}})
              .subscribe((res:any) => {
                  this.contractForm.controls['product'].patchValue(res.res[0].product);
                  this.contractForm.controls['lead'].patchValue(res.res[0].lead_id);
                  this.noticeForm.controls['notes'].patchValue(res.res[0].notes);
                  this.selectcontract(res.res[0]);
                  this.isedit_id = res.res[0]._id;
              });
      }
  }

    /* Get contract */
    getcontract() {
        let userId: any = this.cookeiservice.get('userid');
        const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link, { source:'traning_management_view', condition: { "user_id_object": userId }}).subscribe(res => {
            // this._http.post(link, { source:'traning_management_view'}).subscribe(res => {
            let result: any = res;
            this.allcontract = result.res;
            console.log(this.allcontract,'++++++++++++++');
        });

       
    }

    /* contract auto complete */
    contractSuggest(event:any) {
        this.contractSuggestion = [];
        let keyword: any = event.target.value;
        if(keyword.length > 0) {
            this.contractSuggestionFlug = true;
            for(let c in this.allcontract) {
                if(this.allcontract[c].product_name != null && this.allcontract[c].product_name.toLowerCase().indexOf(keyword.toLowerCase())>-1) {
                    this.contractSuggestion.push(this.allcontract[c]);
                    console.log('call firstname');
                }
            }
        } else {
            this.contractSuggestionFlug = false;
        }
    }

    /* contractForm */
    contractFormSubmit() {
        this.contractFormSubmitFlug = true;
        if(this.contractForm.valid) {
            this.slotView = true;
            this.geteventarr();
        }
    }

    selectcontract(contractData) {
        console.log(contractData);
        if( this.recid == null && this.recid == '') {
            this.contractForm.patchValue({    
            product: contractData.product_name
        });
    }

        const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link, { source:'leades_for_product_search', condition: { "product": contractData.product_id }}).subscribe((res:any) => {
            console.log(res.res,'++++++++++++++');
            this.leadname = res.res;
            if (res.res =="success" && this.recid !=null && this.recid !='') {
                this.selectproductfunc(contractData.product_id );
            }
        });
        // this.contractForm.patchValue({    
        //     product: contractData.product_name
        // });
        this.cookeiservice.set('product_id', contractData.product_id);
        // this.leadname = contractData.firstname + contractData.lastname;
        this.contractSuggestionFlug = false;
        this.contractSuggestion = [];
        // this.selectedlead = contractData;
    }
    selectproductfunc(event:any){
        console.log(event.target.value);
        console.log(this.leadname)
        for(let i in this.leadname){
            if(this.leadname[i].product_id == event.target.value){
                this.selectedproduct = this.leadname[i];
            }
        }
        

    }

    // added by chandrani 
    openLeadDetailsModal(item:any,template:TemplateRef<any>){
        this.selectedlead = item;
        console.log(item)
        this.modalReference = this.modal.show(template);
    }

    goback(){
        this.contractForm.reset();
        this.noticeForm.reset();
    }
    cancelContract() {
        console.log("cancelContract is work");
        this.contractForm.reset();
        this.noticeForm.reset();
        this.slotView = false;
      }
  

}

