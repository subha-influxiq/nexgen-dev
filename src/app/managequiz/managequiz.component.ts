import {Component, OnInit, TemplateRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CookieService } from 'ngx-cookie-service';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl,FormControl} from '@angular/forms';

@Component({
  selector: 'app-managequiz',
  templateUrl: './managequiz.component.html',
  styleUrls: ['./managequiz.component.css'],
  providers: [Commonservices]
})
export class ManagequizComponent implements OnInit {
  public serverurl;
  public lessonid;
  public sourceconditionval;
  public lessondetails: any=[];
  public quizlist_under_lessonid: any=[];
  public iscortarr: any=[];
  modalref:BsModalRef;
  modalref1:BsModalRef;
  modalref2:BsModalRef;
  public dataForm: FormGroup;
  public dataForm1: FormGroup;
  public es;
  public editid;
  public selectedid;
  public qtitle;
  public qid;
  public message:any;
  public deltid:any;
  public answerlist_under_this_quizid:any;
    public issubmit=0;
    public issubmit1=0;

  constructor(es: FormBuilder, public _Commonservices:Commonservices,public router:Router,public http:HttpClient,public modalservices:BsModalService,public cookie:CookieService, public route:ActivatedRoute)
  {
    this.serverurl=_Commonservices.nodesslurl;
    this.es=es;
    this.dataForm=this.es.group({
      lessonid:[''],
      question:['',Validators.required],
      priority:['',Validators.required],
      status:['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.lessonid=params['lessonid'];
      this.getlessondetails();
      this.getquizlist_under_this_lessonid();
      this.dataForm=this.es.group({
        lessonid:[this.lessonid],
        question:['',Validators.required],
        priority:['',Validators.required],
        status:['']
      });
    })
  }
  getlessondetails(){
    this.sourceconditionval ={_id:this.lessonid};
    const link = this._Commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken');
    this.http.post(link,{source:'traininglesson',condition:this.sourceconditionval})
        .subscribe(res=>{
          let result:any;
          result=res;
          this.lessondetails=[];
          this.lessondetails=result.res;
            console.log(this.lessondetails);
        })
  }
  getquizlist_under_this_lessonid(){
    this.sourceconditionval ={lessonid_object:this.lessonid};
    const link = this._Commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken');
    this.http.post(link,{source:'quizlist_view',condition:this.sourceconditionval})
        .subscribe(res=>{
          let result:any;
          result=res;
          this.quizlist_under_lessonid=[];
          this.quizlist_under_lessonid=result.res;
          console.log(this.quizlist_under_lessonid);
        })
  }
  addquizmodal(template: TemplateRef<any>,editid){
      this.dataForm=this.es.group({
          lessonid:[this.lessonid],
          question:['',Validators.required],
          priority:['',Validators.required],
          status:['']
      });
    this.modalref = this.modalservices.show(template, {class: 'quizmodal'});
      this.editid=editid;
    if(editid!=0){
      this.getquizdetails();
    }
  }
  closemodal(){
    this.modalref.hide();
  }
  closemodal1(){
    this.modalref1.hide();
  }
  getquizdetails(){
    this.sourceconditionval ={_id:this.editid};
    const link = this._Commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken');
    this.http.post(link,{source:'quizlist_view',condition:this.sourceconditionval})
        .subscribe(res=>{
          let result:any;
          result=res;
          let quizdetails=[];
          quizdetails=result.res;
          console.log(quizdetails);
          if(quizdetails!=null && quizdetails.length>0){
          /*  let qstatus;
            if (quizdetails[0].priority==true) qstatus=1;
            else qstatus=0;*/
            this.dataForm=this.es.group({
              lessonid:[quizdetails[0].lessonid],
              question:[quizdetails[0].question,Validators.required],
              priority:[quizdetails[0].priority,Validators.required],
              status:[quizdetails[0].status]
            });
          }
        })
  }
  dosubmit() {
      this.issubmit=1;
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    if(this.dataForm.controls['lessonid'].value==null) this.dataForm.controls['lessonid'].patchValue(this.lessonid);
    let data;
    data=this.dataForm.value;
    if(this.editid!=null && this.editid!=0){
      data.id=this.editid;
    }
    console.log(data);
    console.log(this.dataForm.value);
    if (this.dataForm.valid) {
      let link = this._Commonservices.nodesslurl + 'addorupdatedata?token='+this.cookie.get('jwttoken');
      let objarr=['lessonid'];
      this.http.post(link, {source:'quizlist',data:data,sourceobj:objarr})
          .subscribe(res => {
            let result:any ={};
            result = res;
              this.issubmit=0;
            console.log('result....');
            console.log(result);
            if(result.status=='success'){
              this.dataForm.reset();
              this.getquizlist_under_this_lessonid();
              this.modalref.hide();
            }
          }, error => {
            console.log('Oooops!');
          });
    }
  }
  deletequizfunc(id,template:TemplateRef<any>){
      this.modalref=this.modalservices.show(template);
      this.selectedid=id;
  }
  delete(template:TemplateRef<any>)
  {
    this.message='Deleted Successfully!!';
    const link = this._Commonservices.nodesslurl+'deletesingledata?token='+this.cookie.get('jwttoken');
    this.modalref.hide();
    this.http.post(link,{source:'quizlist',id:this.selectedid})
        .subscribe(res => {
          let result;
          result = res;
          if(result.status=='success'){
            setTimeout(()=> {
              this.modalref = this.modalservices.show(template, {class: 'successmodal'});
              this.getquizlist_under_this_lessonid();
            }, 1000);
          }
        }, error => {
          console.log('Oooops!');
        });
  }

  manageanswers(qid,qtitle,template:TemplateRef<any>){
    this.iscortarr=[];
    this.qtitle=qtitle;
    this.qid=qid;
    this.sourceconditionval ={quizid_object:qid};
    const link = this._Commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken');
    this.http.post(link,{source:'answerlist',condition:this.sourceconditionval})
        .subscribe(res=>{
          let result:any;
          result=res;
          this.answerlist_under_this_quizid=[];
          this.answerlist_under_this_quizid=result.res;
        //  console.log(this.answerlist_under_this_quizid);
          for(let c in this.answerlist_under_this_quizid){
            this.iscortarr.push(this.answerlist_under_this_quizid[c].iscorrect);
          }
        })
    this.modalref2=this.modalservices.show(template , {class: 'quizmodal'});
  }

  addanswers(qid,qtitle,template:TemplateRef<any>){
    this.qtitle=qtitle;
    this.qid=qid;
/*   */
    this.dataForm1=this.es.group({
      quizid:[qid],
      answer:['',Validators.required],
      iscorrect:['']
    });
    this.modalref=this.modalservices.show(template, {class: 'quizmodal'});
  }
    dosubmit1(){
        this.issubmit1=1;
        let x: any;
        for (x in this.dataForm1.controls) {
            this.dataForm1.controls[x].markAsTouched();
        }
        console.log('in answer submit !!!'+this.dataForm1.valid);
        let data=this.dataForm1.value;
        if (this.dataForm1.valid) {
            let link = this._Commonservices.nodesslurl + 'addorupdatedata?token='+this.cookie.get('jwttoken');
            let objarr=['quizid'];
            this.http.post(link, {source:'answerlist',data:data,sourceobj:objarr})
                .subscribe(res => {
                    let result:any ={};
                    result = res;
                    console.log('result....');
                    console.log(result);
                    this.issubmit1=0;
                    if(result.status=='success'){
                        this.dataForm1.reset();
                        this.getquizlist_under_this_lessonid();
                        //  this.getquizlist_under_this_lessonid();
                        this.modalref.hide();
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
    deleteansfunc(deltid,template:TemplateRef<any>){
        this.deltid=deltid;
        // this.modalref.hide();
        this.modalref1=this.modalservices.show(template);
    }
    deleteansfun(template:TemplateRef<any>)
    {
        this.message='Deleted Successfully!!';
    const link = this._Commonservices.nodesslurl+'deletesingledata?token='+this.cookie.get('jwttoken');
    this.modalref1.hide();
    this.http.post(link,{source:'answerlist',id:this.deltid})
        .subscribe(res => {
          let result;
          result = res;
          if(result.status=='success'){
            this.modalref = this.modalservices.show(template, {class: 'successmodal'});
              this.getquizlist_under_this_lessonid();
            setTimeout(()=> {
              this.modalref.hide();
              this.modalref2.hide();
            }, 1000);
          }
        }, error => {
          console.log('Oooops!');
        });
  }
  update_answer_iscorrect(id,i){
    setTimeout(()=>{
      console.log(this.iscortarr[i]);
      let data={id:id,iscorrect:this.iscortarr[i]};
      let link = this._Commonservices.nodesslurl + 'addorupdatedata?token='+this.cookie.get('jwttoken');
      this.http.post(link, {source:'answerlist',data:data})
          .subscribe(res => {
            let result:any ={};
            result = res;
            console.log('result....');
            console.log(result);
            if(result.status=='success'){
           //   this.modalref2.hide();
           //   this.manageanswers(this.qid,this.qtitle,answermodal);
            }
          }, error => {
            console.log('Oooops!');
          });
    },1000);
  }
}
