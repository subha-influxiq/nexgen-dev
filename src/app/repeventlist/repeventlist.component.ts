import { Component, OnInit } from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var moment;
@Component({
  selector: 'app-repeventlist',
  templateUrl: './repeventlist.component.html',
  styleUrls: ['./repeventlist.component.css'],
  providers: [Commonservices]
})
export class RepeventlistComponent implements OnInit {
  //public userdetails: any;
  public eventlist: any;
  public dateallarr: any=[];
  public slotarr: any=[];
  public startarr: any=[];
  public flag: any=30;
  public dayarr: any=[];
  public dayarrtemp: any=[];
  public timearr: any=[];
  public timezone: any=[];
    public recid: any;
  //public flag: any=60;
    public mydetails;

  constructor(public _commonservices:Commonservices,public _http:HttpClient,public cookeiservice:CookieService,private route: ActivatedRoute) {

      this._http.get("assets/data/timezone.json")
          .subscribe(res => {
              let result;
              this.timezone=result = res;
              console.log(result);
          }, error => {
              console.log('Oooops!');
              //this.formdataval[c].sourceval = [];
          });
  }

  ngOnInit()
  {
      this.route.params.subscribe(params => {
          this.recid = params['id'];
          this.getevents_under_their_rec();
      });

  //  this.getrepdetails();
      if(this.cookeiservice.get('refreshtoken')==null ||  this.cookeiservice.get('refreshtoken').length<12 ){
          this.getrepdetails();
      }
  }
    getrepdetails(){
        const link = this._commonservices.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
        this._http.post(link,{source:'users',condition:{_id_object:this.cookeiservice.get('userid')}})
            .subscribe(res => {
                let result:any;
                result = res;
                if(result.status=='error'){
                }else{
                    this.mydetails = result.res;
                    console.log('this.mydetails');
                    console.log(this.mydetails);
                    //this.cookeiservice.set('refreshtoken', this.mydetails[0].regionalrecruiter_id);


                    const link = this._commonservices.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
                    this._http.post(link,{source:'users',condition:{_id_object:this.mydetails[0].regionalrecruiter_id}})
                        .subscribe(res => {
                            let result:any;
                            result = res;
                            if(result.status=='error'){
                            }else{
                                //this.mydetails = result.res;
                                console.log('this.regional details');
                                console.log(result.res);
                                console.log(result.res[0]);
                                console.log(result.res[0].refreshtoken);
                                this.cookeiservice.set('refreshtoken', result.res[0].refreshtoken);
                              //  this.cookeiservice.set('recname', result.res[0].firstname +' '+ result.res[0].lastname);






                            }
                        }, error => {
                            console.log('Oooops!');
                        });



                }
            }, error => {
                console.log('Oooops!');
            });
    }

   /* getrepdetails()
  {
    const link = this._commonservices.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link,{source:'users',condition:{_id:this.cookeiservice.get('userid')}})
        .subscribe(res => {
          let result;
          result = res;
          this.userdetails=result.res[0];
         /!* console.log(this.userdetails);*!/
            this.getevents_under_their_rec();
        }, error => {
          console.log('Oooops!');
        });
  }*/
  getevents_under_their_rec()
  {
      let objarr=['userid'];
    const link = this._commonservices.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
      this._http.post(link,{source:'events',condition:{userid_object:this.recid}})
        .subscribe(res => {
          let result;
          result = res;
          this.eventlist=result.res;
        //  console.log(this.eventlist);
          for(let i in this.eventlist){
              let startdatearr = this.eventlist[i].start_date.split("T");
              let starttimearr = this.eventlist[i].start_time.split("T");
              let startdatetimefull = startdatearr[0]+'T'+starttimearr[1];
              let enddatearr = this.eventlist[i].end_date.split("T");
              let endtimearr = this.eventlist[i].end_time.split("T");
              let enddatetimefull = enddatearr[0]+'T'+endtimearr[1];
             let startdateunix=moment(startdatetimefull).unix();
             let enddateunix=moment(enddatetimefull).unix();

             let dateallst = {
                  startdatetime : startdatetimefull,
                  enddatetime : enddatetimefull,
                  timezone : this.eventlist[i].timezone,
                  description : this.eventlist[i].description,
                  meetingwith : this.eventlist[i].meetingwith,
                 startdateunix : startdateunix,
                 enddateunix : enddateunix,
                 differenceinunix : parseInt(enddateunix) - parseInt(startdateunix),
                 differenceinunixupdated : (parseInt(enddateunix) - parseInt(startdateunix))/(3600),
              }

              this.dateallarr.push(dateallst);
              //this.createslot(dateallst);
             this.startslot(dateallst);
          }

          //  this.startslot(this.dateallarr[1]);
            console.log('this.dayarr----------');
            console.log(this.dayarr);
            console.log('this.timearr----------');
            console.log(this.timearr);

        }, error => {
            console.log('Oooops!');
        });
  }
    startslot(val){
        this.addslot(val.startdatetime,val.enddatetime,val.timezone,val.meetingwith);
    }

    addslot(startdatetime,enddatetime,timezone,meetingwith){
        let startdatetimeun=moment(startdatetime).unix();
        let enddatetimeun=moment(enddatetime).unix();
        if(startdatetimeun<enddatetimeun){
            let obj={
                startdate:moment(startdatetime).format('MM/DD/YYYY'),
                starttime:moment(startdatetime).unix(),
                endtime:moment(enddatetime).unix(),
                timezone:timezone,
                meetingwith:meetingwith,
            };
          //  this.dayarrtemp.push(obj);
            if(obj!=null){
                this.dayarr.push(obj);
              //  this.createslotnew(moment(startdatetime).add(1, 'days'),enddatetime,obj);
            }
            this.addslot(moment(startdatetime).add(1, 'days'),enddatetime,timezone,meetingwith);
           /* if(this.dayarrtemp.length>0)this.dayarr.push(this.dayarrtemp);
            this.dayarrtemp=[];*/
        }
    }
    createslotnew(startdatetime,enddatetime,data){
      //  console.log(data);
       /* let starttime=moment(data.starttime).unix();
        let endtime=moment(data.endtime).unix();*/
        if(data.starttime<data.endtime){
           // console.log('...');
            let obj={
                startdate:moment(startdatetime).format('MM-DD-YYYY'),
                starttime:data.starttime, //moment(endtime).format('HH.mm.ss')
                endtime:data.endtime,
                timezone:data.timezone,
                meetingwith:data.meetingwith
            };
            if(obj!=null){
                this.timearr.push(obj);
                data.starttime=(data.starttime+(this.flag*60));
                this.createslotnew(moment(startdatetime).add(1, 'days'),enddatetime,data);
            }
        this.addslot(startdatetime,enddatetime,data.timezone,data.meetingwith);
    }
    }



    createslot(data){
      if(data.mstart==null && data.mend==null){

          data.mstart=data.startdateunix;
          data.mend=(data.startdateunix+(this.flag*60));

          if(data.mstart<data.enddateunix && data.mend<=data.enddateunix) {
              console.log('cccc'+this.startarr.indexOf(data.mstart));
              if(this.startarr.indexOf(data.mstart)==-1)
              {
                  this.slotarr.push(data);
                  this.startarr.push(data.mstart);
              }
              this.startarr.push(data.mstart);
              setTimeout(() => {
                  this.createslot(data);
              }, 1000);
          }
      }else{
          data.mstart=(data.mstart+(this.flag*60));
          data.mend=(data.mend+(this.flag*60));

          if(data.mstart<data.enddateunix && data.mend<=data.enddateunix) {
              console.log('cv'+this.startarr.indexOf(data.mstart));
              if(this.startarr.indexOf(data.mstart)==-1)
              {
                  this.slotarr.push(data);
                  console.log('cv add'+this.startarr.indexOf(data.mstart));
                  console.log(data);
                  console.log(this.slotarr.length);

              }
              this.startarr.push(data.mstart);

              setTimeout(() => {
                  this.createslot(data);
              }, 1000);


          }
      }
      //this.slotarr.push(data);
      //this.slotarr=this.dedupe(this.slotarr);
      this.slotarr.sort(this.dynamicSort("-mstart"));

  }

    dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    dedupe(arr) {
        return arr.reduce(function (p, c) {

            // create an identifying id from the object values
            var id = [c.x, c.y].join('|');

            // if the id is not found in the temp array
            // add the object to the output array
            // and add the key to the temp array
            if (p.temp.indexOf(id) === -1) {
                p.out.push(c);
                p.temp.push(id);
            }
            return p;

            // return the deduped array
        }, { temp: [], out: [] }).out;
    }

}
