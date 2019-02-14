import {Component, OnInit, TemplateRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CookieService } from 'ngx-cookie-service';


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
public sourceval:any="traininglesson";

  constructor(public _Commonservices:Commonservices,public router:Router,public http:HttpClient,public modalservices:BsModalService,public cookie:CookieService)
  {
    this.serverurl=_Commonservices.nodesslurl;
  }

  ngOnInit()
  {
    this.gettrainingsection();
  }
  gettrainingsection()
  {
    const link = this._Commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken');
    this.http.post(link,{source:this.sourceval})
        .subscribe(res=> {
          let result = res;
          this.traininglist=[];
          this.traininglist=result.res;
          console.log(this.traininglist);
        },
        error=>{
          console.log("Can not get");
        });
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
