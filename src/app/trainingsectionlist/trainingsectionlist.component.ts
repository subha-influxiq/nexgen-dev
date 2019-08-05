import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Commonservices } from '../app.commonservices' ;
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
    public imagePaths:any;
    public tarainingcategorylist:any=[];
    public sourceval:any="traininglesson";
    public sourceval2:any="tranningcategory";
    public editorval: any=null;

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
        //  console.log(this.tarainingcategorylist);
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
    this.http.post(link,{source:'traininglesson'})
        .subscribe(res=> {
          let result:any;
           result = res;
          this.traininglist=[];
          this.traininglist=result.res;
      //    console.log(this.traininglist);
        //  console.log(this.traininglist[0].htmleditorvalue);
         // console.log(this.sanitizer.bypassSecurityTrustHtml(this.traininglist[0].htmleditorvalue));
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
  delete(template:TemplateRef<any>)
  {
        this.message='Deleted Successfully!!';
      const link = this._Commonservices.nodesslurl+'deletesingledata?token='+this.cookie.get('jwttoken');
   //   this.http.post(link,{source:'trainingsection'})
     // let data={id:this.selectedid,source:'trainingsection'}

      this.modalref.hide();
    //  this.http.post(link,data)
      this.http.post(link,{source:'traininglesson',id:this.selectedid})
          .subscribe(res => {
              let result;
              result = res;
              if(result.status=='success'){
                  setTimeout(()=> {
                      this.modalref = this.modalservices.show(template, {class: 'successmodal'});
                      this.gettrainingsection();
                  }, 2000);
              }
          }, error => {
              console.log('Oooops!');
          });

  }
    nodelete(){
      this.modalref.hide();
    }
    showhtmlval(editorval,showhtmlmodal:TemplateRef<any>){
        this.editorval=null;
        this.editorval=editorval;
        this.modalref = this.modalservices.show(showhtmlmodal, { class: 'modal-new-popup' });
    }
    callslider(item,showfilemodal){
        console.log(item);
        let data={
            filename:item.fileservername,
            lessonid:item._id,
        }
        const link = this._Commonservices.nodesslurl+'getslidevalues';
        this.http.post(link,data)
            .subscribe(res=>{
                let result;
                result=res;
                this.imagePaths = result.imagePaths;
                console.log(result.imagePaths);
                this.modalref = this.modalservices.show(showfilemodal, {class: 'showfilemodal'});
            }, error =>{
                this.callslider(item,showfilemodal);
                console.log('Ooops');
            });
    }
    showimag(img){
        console.log('??');
      //  console.log(img);
        let tempvar=img.substr(3,img.length);
     //   console.log(this._Commonservices.fileimgsslurl+tempvar);
        return this._Commonservices.fileimgsslurl+tempvar;
      //  console.log(this._Commonservices.uploadsslurl+tempvar);
    }
}

