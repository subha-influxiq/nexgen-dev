import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Commonservices } from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CookieService } from 'ngx-cookie-service';

declare var moment:any;

@Component({
  selector: 'app-slotview',
  templateUrl: './slotview.component.html',
  styleUrls: ['./slotview.component.css'],
  providers: [Commonservices]
})

export class SlotviewComponent implements OnInit {
  public allslots;
  public timezoneval:any;
  public recid:any;
  public refreshtoken:any;
  public timezone:any=[];
  public filterval5:any;
  public blockHeaderFooterBlock: boolean = true;
  public daterangepickerOptions = {
    startDate: '15/08/2019',
    endDate: '31/12/2019',
    format: 'MM/DD/YYYY',
    minDate: moment().format("MM/DD/YYYY"),
    noDefaultRangeSelected: true,
   }
   public headerText: any = {};
   public slotval: any ;
   public slotView: boolean = true;

   public closerLeadForm: FormGroup;
   public closerLeadFormSubmitFlug: boolean = false;
   public allLeads: any;
   public leadsSuggestion: any = [];
   public leadsSuggestionFlug: boolean = false;
   public products: any = [];
   public timeSpanView: boolean = false;
   public timeSpanVal: any = "15";
   public loader: boolean = false;
   public modalReference : BsModalRef;
   public selectedlead:any;

  constructor(public _commonservice:Commonservices, private router: Router, public _http:HttpClient, public modal:BsModalService, public cookeiservice: CookieService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    window.scrollTo(1000,0);
    this._commonservice =_commonservice;

      this._http.get("assets/data/timezone.json")
          .subscribe(res => {
              let result;
              this.timezone=result = res;
              this.timezoneval=this.cookeiservice.get('timezone');
          }, error => {
              console.log('Oooops!');
              //this.formdataval[c].sourceval = [];
          });

    /* Agreement Form Control */
    this.closerLeadForm = this.formBuilder.group({
        leads:      [ null, [ Validators.required, Validators.maxLength(200) ] ],
        product:    [ "", [ Validators.required, Validators.maxLength(200) ] ]
      });
  }

  settimezone(){
      this.cookeiservice.set('timezone',this.timezoneval);
      window.location.reload();
    }
    ngOnInit() {
        // if called as a rep
        this.route.params.subscribe(params => {
            this.recid = params['id'];
            this.slotval = params['slotval'];


            if(this.cookeiservice.get('userid')) {
                if( this.recid != null) {
                    this.get_refreshtoken_of_this_rec();
                    this.getUserDetails(this.recid);
                }
                this.geteventarr();
            } else {
                this.blockHeaderFooterBlock = false;
                const link = this._commonservice.nodesslurl + 'temptoken';
                this._http.post(link, { }).subscribe(res => {
                    let result:any = res;
                    this.cookeiservice.set('jwttoken', result.token);

                    this.getUserDetails(this.recid);
                    this.geteventarr();
                })
            }

            if(params['leadid']!=null && params['pid']!=null){

                this.closerLeadForm.controls['product'].patchValue(params['pid']);
                this.closerLeadForm.controls['leads'].patchValue(params['leadid']);
                this.cookeiservice.set('leadsId',params['leadid']);
                this.closerLeadFormSubmit();
                console.log('form logs',this.closerLeadForm.value);
            }
        });
    }

    get_refreshtoken_of_this_rec(){
        const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
        this._http.post(link,{source:'users',condition:{_id_object:this.recid}}).subscribe(res => {
            let result: any = res;
            if(result.res.length > 0) {
                this.refreshtoken = result.res[0].refreshtoken;
            }
            
            this.cookeiservice.set('refreshtoken', this.refreshtoken);
        });
    }
    setdatetonull(){
        this.filterval5 = null;
        this.geteventarr();
    }
    geteventarr(){
        let cond: any;
        switch(this.route.snapshot.url[0].path) {

            case 'on-boarding-call':
                this.headerText.hedaerH4 = 'Select your On-Boarding Call Appointment as per your convenience.';
                this.headerText.span = 'Please select your Time Zone carefully to eliminate any confusion. Your scheduled appointment will be confirmed and mailed to you accordingly.';
                if(this.filterval5!=null && this.filterval5 != '') {
                    cond = { "is_onboarding": true, slots:{$type:'array'}, startdate:{
                        $lte: moment(this.filterval5[1]).format('YYYY-MM-DD'),
                        $gte: moment(this.filterval5[0]).format('YYYY-MM-DD')
                    }};
                } else {
                    cond = { "is_onboarding": true, slots:{$type:'array'}, startdate:{
                        $lte: moment().add(2, 'weeks').format('YYYY-MM-DD'),
                        $gte: moment().subtract(1, 'days').format('YYYY-MM-DD')
                    }};
                }
                break;
            case 'customevents':
                    this.cookeiservice.delete('useremail')
                    //this.cookeiservice.set('useremail', null);
                this.headerText.hedaerH4 = 'SCHEDULE A CALL WITH BETO PAREDES. <br/>' +
                    'Please feel free to schedule a '+this.slotval+'-minute call with me here on my calendar. You will be provided with a conference dial in number and webcast if needed for the call. <br/>' +
                    '<b style="color:red">BE SURE TO ADD YOUR EMAIL ADDRESS SO THE INVITATION IS SENT TO YOU</b> <br>';
                this.headerText.span = 'Please select your Time Zone carefully to eliminate any confusion. Your scheduled appointment will be confirmed and mailed to you accordingly.';
                if(this.filterval5!=null && this.filterval5 != '') {
                    cond = {"timespan":this.slotval.toString(), "is_custom": true, slots:{$type:'array'}, startdate:{
                        $lte: moment(this.filterval5[1]).format('YYYY-MM-DD'),
                        $gte: moment(this.filterval5[0]).format('YYYY-MM-DD')
                    }};
                } else {
                    cond = {"timespan":this.slotval, "is_custom": true, slots:{$type:'array'}, startdate:{
                        $lte: moment().add(2, 'weeks').format('YYYY-MM-DD'),
                        $gte: moment().subtract(1, 'days').format('YYYY-MM-DD')
                    }};
                }
                break;
            case 'customevent':
                this.cookeiservice.delete('useremail');
                this.timeSpanView = true;
                // this.cookeiservice.set('useremail', null);
                this.headerText.hedaerH4 = 'Please feel free to schedule up to an hour conference call with me here on my calendar. You will be provided with a conference dial in number and webcast if needed for the call. <br/>' +
                    '<b style="color:red">BE SURE TO ADD YOUR EMAIL ADDRESS SO THE INVITATION IS SENT TO YOU</b> <br>';
                this.headerText.span = 'Please select your Time Zone carefully to eliminate any confusion. Your scheduled appointment will be confirmed and mailed to you accordingly.';
                if(this.filterval5!=null && this.filterval5 != '') {
                    cond = {"is_custom": true, "timespan": this.timeSpanVal, slots:{$type:'array'}, startdate:{
                        $lte: moment(this.filterval5[1]).format('YYYY-MM-DD'),
                        $gte: moment(this.filterval5[0]).format('YYYY-MM-DD')
                    }};
                } else {
                    cond = {"is_custom": true, "timespan": this.timeSpanVal, slots:{$type:'array'}, startdate:{
                        $lte: moment().add(2, 'weeks').format('YYYY-MM-DD'),
                        $gte: moment().subtract(1, 'days').format('YYYY-MM-DD')
                    }};
                }
                break;

            case 'discovery-call':
                this.headerText.hedaerH4 = 'Select your Discovery Call Appointment as per your convenience.';
                this.headerText.span = 'Please select your Time Zone carefully to eliminate any confusion. Your scheduled appointment will be confirmed and mailed to you accordingly.';
                if(this.filterval5!=null && this.filterval5 != '') {
                    cond = { "is_discovery": true, slots:{$type:'array'}, startdate:{
                        $lte: moment(this.filterval5[1]).format('YYYY-MM-DD'),
                        $gte: moment(this.filterval5[0]).format('YYYY-MM-DD')
                    }};
                } else {
                    cond = { "is_discovery": true, slots:{$type:'array'}, startdate:{
                        $lte: moment().add(2, 'weeks').format('YYYY-MM-DD'),
                        $gte: moment().subtract(1, 'days').format('YYYY-MM-DD')
                    }};
                }
                break;
            case 'book-a-closer':

                if(!this.closerLeadForm.valid) {
                    this.getLeads();
                    this.slotView = false;
                    return ;
                }else{
                    this.slotView=true;
                }
                console.log('slotview',this.slotView);
                this.headerText.hedaerH4 = 'Select your Closer Call Appointment as per your convenience.';
                this.headerText.span = 'Please select your Time Zone carefully to eliminate any confusion. Your scheduled appointment will be confirmed and mailed to you accordingly.';
                if(this.filterval5!=null && this.filterval5 != '') {
                    cond = { "is_discovery": false, "is_onboarding": false, "is_qna": false, "is_custom": false, "userproducts": { "$in": [ this.closerLeadForm.value.product ] }, slots:{$type:'array'}, startdate:{
                        $lte: moment(this.filterval5[1]).format('YYYY-MM-DD'),
                        $gte: moment(this.filterval5[0]).format('YYYY-MM-DD')
                    }};
                } else {
                    cond = { "is_discovery": false, "is_onboarding": false, "is_qna": false, "is_custom": false, "userproducts": { "$in": [ this.closerLeadForm.value.product ] }, slots:{$type:'array'}, startdate:{
                        $lte: moment().add(2, 'weeks').format('YYYY-MM-DD'),
                        $gte: moment().subtract(1, 'days').format('YYYY-MM-DD')
                    }};
                    console.log('cond',cond);
                }
                break;
            case 'question-and-answer-call':
                this.headerText.hedaerH4 = 'Select your Question and Answar Appointment as per your convenience.';
                this.headerText.span = 'Please select your Time Zone carefully to eliminate any confusion. Your scheduled appointment will be confirmed and mailed to you accordingly.';
                if(this.filterval5!=null && this.filterval5 != '') {
                    cond = { "is_qna": true, slots:{$type:'array'}, startdate:{
                        $lte: moment(this.filterval5[1]).format('YYYY-MM-DD'),
                        $gte: moment(this.filterval5[0]).format('YYYY-MM-DD')
                    }};
                } else {
                    cond = { "is_qna": true, slots:{$type:'array'}, startdate:{
                        $lte: moment().add(2, 'weeks').format('YYYY-MM-DD'),
                        $gte: moment().subtract(1, 'days').format('YYYY-MM-DD')
                    }};
                }
                break;
            default:
                if(this.filterval5!=null && this.filterval5 != '') {
                    let spl = this.filterval5.split('/');
                    let spl_modified = spl[2]+'-'+spl[0]+'-'+spl[1];
                    if(this.recid == null) {
                        cond = { allslotsuserid_object:this.cookeiservice.get('userid'),slots:{$type:'array'},   startdate:spl_modified};
                    } else {
                        cond = {
                            allslotsuserid_object:this.recid,slots:{$type:'array'},   startdate:spl_modified
                        };
                    }
                } else {
                    if(this.recid == null) {
                        cond = { allslotsuserid_object:this.cookeiservice.get('userid'),slots:{$type:'array'}, startdate:{
                            $lte: moment().add(1, 'months').format('YYYY-MM-DD'),
                            $gte: moment().subtract(1, 'days').format('YYYY-MM-DD')
                        }};
                    } else {
                        cond={allslotsuserid_object:this.recid,slots:{$type:'array'},startdate:{
                            $lte: moment().add(1, 'months').format('YYYY-MM-DD'),
                            $gte: moment().subtract(1, 'days').format('YYYY-MM-DD')
                        }};
                    }
                }
        }
        

        const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link,{source:'eventdayarr_events',condition:cond}).subscribe(res => {
            let result:any = res;
            this.allslots = result.res;
            console.log('allslots',this.allslots,this.allslots.length);
        });
    }
 /* ngOnInit() {

    const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:'eventdayarr_events',condition:{allslotsuserid_object:this.cookeiservice.get('userid'),slots:{$type:'array'}}})
        .subscribe(res => {
          let result:any={};
          result = res;
          this.allslots=result.res;
          console.log('===========================================');
          console.log('this.allslots');
          console.log(this.allslots);
          console.log(result);
        })
      // if called as a rep
      this.route.params.subscribe(params => {
          this.recid = params['id'];
          this.get_refreshtoken_of_this_rec();
      });
  }
    get_refreshtoken_of_this_rec(){
        const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
        this._http.post(link,{source:'users',condition:{_id_object:this.recid}})
            .subscribe(res => {
                let result:any={};
                result = res;
                this.refreshtoken=result.res[0].refreshtoken;
              //  console.log('===========================================');
                console.log('this.refreshtoken ' + this.refreshtoken);
                this.cookeiservice.set('refreshtoken', this.refreshtoken);
            })
    }*/
  showtime(item,eachslots){
   // console.log(moment(item.startdate+'T'+eachslots.trim()+':00')); //.format('HH.mm')
   // console.log(tm);
   // console.log(moment(tm).format('hh:mm A'));
  //   console.log(moment(tm).add(30, 'minutes').format());
  //  return tm+' - '+moment(tm).add(span, 'minutes').format();
      var a=moment(item.startdate+'T'+eachslots.trim()+':00');
    var starttime= a.format('hh.mm A');
      var endtime = moment(a).add(30, 'minutes').format('hh.mm A');
      return starttime +' - '+endtime;
  }

  /* Get user details */
  getUserDetails(id) {
      //alert(id);
      if(id!=null) {
          const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
          this._http.post(link, {source: 'users', condition: {_id_object: id}})
              .subscribe(res => {
                  let result: any = res;
                  this.cookeiservice.set('useremail', result.res[0].email);
                  this.cookeiservice.set('phone', result.res[0].telephone);
                  this.cookeiservice.set('fname', result.res[0].firstname+" "+result.res[0].lastname);
                  console.log("Checking:   ", this.cookeiservice.get('useremail'));
              });
      }
  }

    /* Get Leads */
    getLeads() {
        let userId: any = this.cookeiservice.get('userid');
        const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link, { source:'leads_view', condition: { "created_by_object": userId }}).subscribe(res => {
            let result: any = res;
            this.allLeads = result.res;
            console.log(this.allLeads);
        });
    }

    /* Leads auto complete */
    leadsSuggest(event:any) {
        this.leadsSuggestion = [];
        let keyword: any = this.closerLeadForm.value.leads;
        if(keyword.length > 0) {
            this.leadsSuggestionFlug = true;
            for(let c in this.allLeads) {
                if(this.allLeads[c].firstname != null && this.allLeads[c].firstname.toLowerCase().indexOf(keyword.toLowerCase())>-1) {
                    this.leadsSuggestion.push(this.allLeads[c]);
                } else if(this.allLeads[c].lastname != null && this.allLeads[c].lastname.toLowerCase().indexOf(keyword.toLowerCase())>-1){
                    this.leadsSuggestion.push(this.allLeads[c]);
                    
                } 
            }
        } else {
            this.leadsSuggestionFlug = false;
        }
    }

    /* closerLeadForm */
    closerLeadFormSubmit() {
        this.closerLeadFormSubmitFlug = true;
        if(this.closerLeadForm.valid) {
            this.slotView = true;
            this.geteventarr();
        }
    }

    selectLeads(leadsData) {
        this.closerLeadForm.patchValue({    
            leads: leadsData.firstname + ' ' + leadsData.lastname
        });
        this.cookeiservice.set('leadsId', leadsData._id);
        this.products = leadsData.productname;
        this.leadsSuggestionFlug = false;
        this.leadsSuggestion = [];
        this.selectedlead = leadsData;
    }

    // added by chandrani 
    openLeadDetailsModal(item:any,template:TemplateRef<any>){
        this.modalReference = this.modal.show(template);
    }

}