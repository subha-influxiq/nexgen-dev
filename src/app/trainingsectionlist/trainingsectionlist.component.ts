import {Component, OnInit, TemplateRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-trainingsectionlist',
  templateUrl: './trainingsectionlist.component.html',
  styleUrls: ['./trainingsectionlist.component.css'],
  providers: [Commonservices]
})
export class TrainingsectionlistComponent implements OnInit {
public serverurl;
public traininglist:any=[];
public message:any;
modalref:BsModalRef;
public selectedid:any;
public tarainingcategorylist:any=[];
public sourceval:any="traininglesson";
public sourceval2:any="tranningcategory";

  constructor(public _Commonservices:Commonservices,public router:Router,public http:HttpClient,public modalservices:BsModalService,public cookie:CookieService,public sanitizer: DomSanitizer)
  {
    this.serverurl=_Commonservices.nodesslurl;
    this.sanitizer=sanitizer;
  }

  ngOnInit()
  {
    this.gettrainingsection();
    this.gettraininglist()
  }
  gettraininglist()
  {
    const link = this._Commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken');
    this.http.post(link,{source:this.sourceval2})
        .subscribe(res=>{
          let result:any;
          result=res;
          this.tarainingcategorylist=[];
          this.tarainingcategorylist=result.res;
          console.log(this.tarainingcategorylist);
        })
  }
  gettrainingcategoryname(trainingcategory)
  {
    let i:any;
    for(i in this.tarainingcategorylist){
    if(this.tarainingcategorylist[i]._id==trainingcategory){
      return this.tarainingcategorylist[i].categoryname;
    }
    }
  }
  gettrainingsection()
  {
    const link = this._Commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken');
    this.http.post(link,{source:this.sourceval})
        .subscribe(res=> {
          let result:any;
           result = res;
          this.traininglist=[];
          this.traininglist=result.res;
      //    console.log(this.traininglist);
        //  console.log(this.traininglist[0].htmleditorvalue);
          console.log(this.sanitizer.bypassSecurityTrustHtml(this.traininglist[0].htmleditorvalue));
        },
        error=>{
          console.log("Can not get");
        });
  }
  trusthtml(htmlval){
    return this.sanitizer.bypassSecurityTrustHtml(htmlval);
  }
  deletetrainingsection(id:any,template:TemplateRef<any>)
  {
    this.modalref=this.modalservices.show(template);
    this.selectedid=id;
  }
  delete(id:any,template:TemplateRef<any>)
  {


  }

}
