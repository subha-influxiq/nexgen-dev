import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {Commonservices} from '../app.commonservices' ;
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

  constructor(public _commonservice:Commonservices,private router: Router,public _http:HttpClient,public modal:BsModalService,public cookeiservice: CookieService,private route: ActivatedRoute)
  {
   //   console.log(moment().format('ddd'));

    this._commonservice=_commonservice;

      this._http.get("assets/data/timezone.json")
          .subscribe(res => {
              let result;
              this.timezone=result = res;
              console.log(result);
              this.timezoneval=this.cookeiservice.get('timezone');
          }, error => {
              console.log('Oooops!');
              //this.formdataval[c].sourceval = [];
          });
  }
  settimezone(){
      this.cookeiservice.set('timezone',this.timezoneval);
      setTimeout(()=>{
        this.geteventarr();
      },1000);
      
     // window.location.reload();
    }
    ngOnInit() {
        // if called as a rep
        this.route.params.subscribe(params => {
            this.recid = params['id'];
            if( this.recid!=null){
            this.get_refreshtoken_of_this_rec();
            }
            //  events for regional/rep
            this.geteventarr();
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
    }
    setdatetonull(){
        this.filterval5 = null;
        this.geteventarr();
    }
    geteventarr(){
        console.log('geteventarr');
        var cond;
        if(this.filterval5!=null && this.filterval5!=''){
            let spl=this.filterval5.split('/');
            console.log(spl);
            let spl_modified= spl[2]+'-'+spl[0]+'-'+spl[1];
            if(this.recid==null){
                cond={allslotsuserid_object:this.cookeiservice.get('userid'),slots:{$type:'array'},   startdate:spl_modified};
            }else{
            cond={
                allslotsuserid_object:this.recid,slots:{$type:'array'},   startdate:spl_modified
            };
        }
        }
        else{
            if(this.recid==null){
                cond={allslotsuserid_object:this.cookeiservice.get('userid'),slots:{$type:'array'}, startdate:{
                    $lte: moment().add(1, 'months').format('YYYY-MM-DD'),
                    $gt: moment().subtract(1, 'days').format('YYYY-MM-DD')
                }}; //,startdate:new Date(),
            }else{
                cond={allslotsuserid_object:this.recid,slots:{$type:'array'},startdate:{
                    $lte: moment().add(1, 'months').format('YYYY-MM-DD'),
                    $gt: moment().subtract(1, 'days').format('YYYY-MM-DD')
                }};
            }
        }

        const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
        this._http.post(link,{source:'eventdayarr_events',condition:cond})
            .subscribe(res => {
                let result:any={};
                result = res;
                this.allslots=result.res;
                console.log('===========================================');
                console.log('this.allslots');
                console.log(this.allslots);
                console.log(result);
            })
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

}