import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { AccordionConfig } from 'ngx-bootstrap/accordion';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {CarouselConfig} from "ngx-bootstrap";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

declare var $:any;
export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true });
}

@Component({
  selector: 'app-rep-traingcenter',
  templateUrl: './rep-traingcenter.component.html',
  styleUrls: ['./rep-traingcenter.component.css'],
  providers: [Commonservices , { provide: AccordionConfig, useFactory: getAccordionConfig },{ provide: CarouselConfig, useValue: { interval: 5000, noPause: true, showIndicators: true } }]
})
export class RepTraingcenterComponent implements OnInit {
  public datalist;
  public lessonid;
  public trainingcategory1;
  public correctanscount;
  public markasdonedatalist;
  public quizlistwithanswer;
  public cid:any=0;
  public issubmit:any=0;
  public lid:any=0;
  public sorteddatalist=[];
  public traininglessonflag: boolean = false;
  public done_Training_lesson;
  public last_lesson;
  public trainingcategory;
  public donelesson:any=[];
  public donecategory:any=[];
  public notdonecategory:any=[];
  public iscortansarr:any=[];
  public correctansarrid:any=[];
  public ngclassflag=0;
  public curitem:any=null;
  public cureentcursor:any=0;
  public flg:any=1;
  public nextcat:any;
    modalRef1: BsModalRef;


    /* incpmolete lession */
    public lastLessionName: any;

  constructor(public _commonservice:Commonservices,private router: Router,public _http:HttpClient,public modal:BsModalService,private cookeiservice: CookieService, public sanitizer: DomSanitizer,private route: ActivatedRoute) {
    this._commonservice=_commonservice;
  }

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.cid = params['cid'];
          this.lid = params['lid'];
      });
      if(this.cid == null){            //initial training
          this.getmarkasdonelist();
          this.ngclassflag = 0;
      }else{                        // other
          this.gettraininglist();
          this.ngclassflag = 1;
      }
      this.getmarkasdonelist();         //delete after done
  }

    gettraininglist(){
        this.donecategory = [];
        this.notdonecategory = [];
        const link = this._commonservice.nodesslurl+'training_category?token=' + this.cookeiservice.get('jwttoken');
        // this._http.post(link,{source:'training_category_lesson_view',condition:{type1:'Rep Trainning Table'}})
        let data={userid: this.cookeiservice.get('userid')};
        this._http.post(link,data)
            .subscribe(res => {
                let result:any = res;
                if(result.status == 'error') {
                } else {
                    this.trainingcategory = result.res;
                    this.done_Training_lesson = result.res2;
                    this.last_lesson = result.res3;
                    for(let i in this.last_lesson){

                        for(let y in this.done_Training_lesson){

                            if(this.done_Training_lesson[y].traininglesson==this.last_lesson[i]._id){
                                this.donelesson.push(this.last_lesson[i].trainingcategory);
                            }
                        }
                    }

                    for(let c in this.trainingcategory){
                        if($.inArray(this.trainingcategory[c]._id,this.donelesson)!=-1){
                            this.donecategory.push(this.trainingcategory[c]);
                        }else this.notdonecategory.push(this.trainingcategory[c]);

                        if(this.trainingcategory[c]._id == this.cid) {
                            this.lastLessionName = this.trainingcategory[c].categoryname;
                        }
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }

  getmarkasdonelist(){
    const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    this._http.post(link, { source: 'donetraininglesson', condition: { userid_object: this.cookeiservice.get('userid') }})
        .subscribe(res => {
          let result: any = res;
          if(result.status=='error') {
          } else {
            this.markasdonedatalist = [];
            this.markasdonedatalist = result.res;
            this.getdatalist(result.res);
          }
        }, error => {
          console.log('Oooops!');
        });
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

    getdatalist(itemName) {
        if(typeof(itemName) == 'string') {
            this.lastLessionName = itemName;
        }

        if(this.cid==0) this.cid='5c664284065aaf332831948c';

        const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link,{source:'traininglesson',condition:{trainingcategory_object:this.cid}})
            .subscribe(res => {
                let result:any = res;
                if(result.status=='error') {
                } else {
                    this.datalist = [];
                    this.sorteddatalist = [];
                    this.traininglessonflag=false;
                    this.datalist = result.res;
                    this.datalist.sort(this.dynamicSort("_id"));

                    for(let i in this.datalist) {
                        if ((this.datalist[i].prerequisite_lesson == null || this.datalist[i].prerequisite_lesson=='' ) && this.traininglessonflag == false) {
                            this.sorteddatalist.push(this.datalist[i]);
                            this.traininglessonflag = true;
                        }
                        

                    }

                    for(let i in this.datalist) {
                        if(this.datalist[i].prerequisite_lesson!=null && this.traininglessonflag==true){
                            for(let h in this.datalist){
                                if(this.sorteddatalist[this.sorteddatalist.length-1]._id==this.datalist[h].prerequisite_lesson){
                                    if(this.datalist[h].yesorno == 'yes') {
                                    }
                                    this.sorteddatalist.push(this.datalist[h]);
                                }
                            }
                        }
                    }

                    for(let i in this.sorteddatalist){
                        if(this.sorteddatalist[i].slides!=null){
                            console.log(this._commonservice.fileimgsslurl+this.sorteddatalist[i].slides[0].substr(3,this.sorteddatalist[i].slides[0].length));
                            this.sorteddatalist[i].firstslide=this._commonservice.fileimgsslurl+this.sorteddatalist[i].slides[0].substr(3,this.sorteddatalist[i].slides[0].length);
                        }
                        console.log('this.sorteddatalist[i].htmleditorvalue--'+i);
                        console.log(this.sorteddatalist[i].htmleditorvalue);
                        this.sorteddatalist[i].sanitizedHtmlEditor = this.sanitizer.bypassSecurityTrustHtml(this.sorteddatalist[i].htmleditorvalue);
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    getslide(val:any){
      if(this.curitem==null || this.curitem!=val){
          this.curitem=val;
          this.cureentcursor=0;
          return this._commonservice.fileimgsslurl+this.sorteddatalist[val].slides[this.cureentcursor].substr(3,this.sorteddatalist[val].slides[this.cureentcursor].length);
      }
      else{

          console.log('in else block of get slide');
          return this._commonservice.fileimgsslurl+this.sorteddatalist[val].slides[this.cureentcursor].substr(3,this.sorteddatalist[val].slides[this.cureentcursor].length);

      }
          //return this.sorteddatalist[val].firstslide;
    }
    updatecurflag(){
        this.cureentcursor=0;
    }
    nextslide(){
      this.flg=0;
      this.cureentcursor++;
      this.flg=1;
    }
    prevslide(){
      this.flg=0;
      this.cureentcursor--;
      this.flg=1;
    }
    markasdonetraninglesson(item,i){
       /* alert(i);
        alert(this.sorteddatalist);
        alert(this.sorteddatalist.length);
        alert(this.notdonecategory.length);*/
        this.nextcat=null;
        let b1:any;
        for( b1 in this.notdonecategory){
            //alert(this.notdonecategory[b1]._id);
            //alert('cat');
            //alert(item.trainingcategory);
            //alert(this.notdonecategory[b1].categoryname);
            //alert(this.notdonecategory[b1]._id);
            if(this.notdonecategory[b1]._id!=item.trainingcategory)
                this.nextcat=this.notdonecategory[b1]._id;
        }


        let link = this._commonservice.nodesslurl + 'addorupdatedata?token='+this.cookeiservice.get('jwttoken');
        let objarr=['trainingcategory','traininglesson','userid'];
        let data={
            userid: this.cookeiservice.get('userid'),
            traininglesson: item._id,
            trainingcategory: item.trainingcategory
        }
        this._http.post(link, {source:'donetraininglesson',data:data,sourceobj:objarr})
            .subscribe((res) => {
                if((this.sorteddatalist.length-i)==1){
                    let notdonecatlen=this.notdonecategory.length;

                    this.gettraininglist();
                    //let nextcat:any;



                    //alert(5);
                    //alert(notdonecatlen);
                    if(notdonecatlen>1 && this.cid!=0){
                       // alert(6);
                        //alert(this.nextcat);
                        this.cid=this.nextcat;
                        let result: any = res;
                        this.getdatalist(result.categoryname);
                        let ccat:any=null;
                        /*for(let b1:any in this.notdonecategory){
                            //alert(this.notdonecategory[b1]._id);
                            //alert('cat');
                            //alert(item.trainingcategory);
                            if(ccat!=null){
                                alert(ccat);
                                this.cid=this.notdonecategory[b1]._id;

                                break;
                            }

                            if(item.trainingcategory==this.notdonecategory[b1]._id){
                                //alert(item.trainingcategory);
                                ccat=item.trainingcategory;
                            }

                        }*/
                    }
                }

                let result:any ={};
                result = res;
                // console.log('result....');
                // console.log(result);
                if(result.status=='error'){
                    //  console.log(result.msg);
                }
                else {
                    this.getmarkasdonelist();
                    //this.getdatalist();
                    // last lesson coompleted
                    if(item._id == this.sorteddatalist[this.sorteddatalist.length-1]._id){
                        if(this.cid==null || this.cid==0){         //initial
                            let link = this._commonservice.nodesslurl + 'leadsignupquestionnaireupdate?token='+this.cookeiservice.get('jwttoken');
                            let data = {
                                id: this.cookeiservice.get('userid'),
                                reptraininglessonstep: 1
                            }
                            this._http.post(link, {data:data})
                                .subscribe(res => {
                                    let result: any = {};
                                    result = res;
                                    this.router.navigate(['/repdashboard'])
                                    this.getdatalist(result.categoryname);
                                });
                        }else{
                            this.getdatalist(result.categoryname);
                        }/*else{      // other
                    let link = this._commonservice.nodesslurl + 'addorupdatedata?token='+this.cookeiservice.get('jwttoken');
                    let objarr=['completedtraining'];
                    let data={
                        completedtraining : item._id
                    }
                    this._http.post(link, {source:'users',data:data,sourceobj:objarr})
                        .subscribe(res => {
                            let result:any ={};
                            result = res;
                            if(result.status=='error'){
                            }
                            else {
                                this.router.navigate(['/repdashboard'])
                            }
                            });
                }*/

                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    getdoneclass(id){
        //return 'show';
        for(let i in this.markasdonedatalist){
            if(this.markasdonedatalist[i].traininglesson==id){
                // console.log('??');
                return true;
            }
        }
        return false;
    }
    disableaccor(item,i1){
        //  console.log('this.sorteddatalist');
        //console.log(this.sorteddatalist);
        //this.cureentcursor=0;

        if(i1==0) {
            this.sorteddatalist[i1].openaccordian=true;
            if(this.markasdonedatalist.length>0){
            if(this.markasdonedatalist[0].traininglesson==item._id){
                if(this.sorteddatalist[i1+1]!=null )this.sorteddatalist[i1+1].openaccordian=true;
            }
            }
            return false;
        }
        else{
            for(let i in this.markasdonedatalist){
                if(this.markasdonedatalist[i].traininglesson==item._id){
                    //  console.log('--===--');
                    if(this.sorteddatalist.length-1!=i1){
                        this.sorteddatalist[i1+1].openaccordian=true;
                        this.sorteddatalist[i1].markasdone=true;
                    }
                    //console.log('this.sorteddatalist');
                    //console.log(this.sorteddatalist);
                    return false;
                }
                if(this.markasdonedatalist[i].traininglesson!=item._id && item.openaccordian!=null && item.openaccordian==true){
                    //this.sorteddatalist[i+1].openaccordian=false;
                    // console.log('-----');
                    return false;
                }
            }
        }
        return true;
    }
    putclass(){
        if(this.ngclassflag==1){
            return 'trainingdivadjust';        // other
        }else{
            return 'trainingdivfull';        // initial
        }
    }

    audiovideoended(item,i){
        console.log('The audio/video has ended');
        this.markasdonetraninglesson(item,i);
    }


/*    getimageoffile(fileservername){
        /!*POST - st*!/
        let data={
            filename:fileservername
        }
        const link = this._commonservice.nodesslurl+'getslidevalues';
        this._http.post(link,data)
            .subscribe(res=>{
                let result;
                result=res;
                console.log(result);
                console.log(result.imagePaths);
            })
        /!*POST - end*!/
    }*/
    showimag(img){
        console.log(img);
        let tempvar=img.substr(3,img.length);
        return this._commonservice.fileimgsslurl+tempvar;
    }
    gotoquizmodal(lessonid, trainingcategory, lastLessionName, template:TemplateRef<any>){
        this.lessonid=lessonid;
        this.trainingcategory1=trainingcategory;
        const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
        this._http.post(link,{source:'quiz_answer_list_view',condition:{lessonid_object:lessonid}})
            .subscribe(res=>{
                let result;
                result=res;
                this.quizlistwithanswer = result.res;
                console.log(result);
                this.issubmit=0;
                this.modalRef1 = this.modal.show(template, {class: 'quizmodal'});
            })
    }
    closemodal(){
        this.modalRef1.hide();
    }
    check_answer_iscorrect(item,i){
        setTimeout(()=>{
            this.correctanscount=0;
            console.log(this.quizlistwithanswer);
            for(let i in this.quizlistwithanswer){
                if(this.quizlistwithanswer[i].myanswer!=null){
                    this.quizlistwithanswer[i].hascorrectanswer=false;
                    for(let j in this.quizlistwithanswer[i].answerlistarr){
                        console.log('for  '+i);
                        if(this.quizlistwithanswer[i].answerlistarr[j]._id==this.quizlistwithanswer[i].myanswer){
                            if(this.quizlistwithanswer[i].answerlistarr[j].iscorrect==true){
                            console.log('if  '+j);
                            this.quizlistwithanswer[i].hascorrectanswer=true;
                                this.correctanscount++;
                            }
                        }
                    }
                }
            }
            console.log(this.correctanscount);
            console.log((this.correctanscount/this.quizlistwithanswer.length)*100);
        },500)

    }

    submit_answer_iscorrect(template:TemplateRef<any>){
        this.issubmit=1;
        console.log(this.correctanscount);
        console.log((this.correctanscount/this.quizlistwithanswer.length)*100);
        let item={
            _id:this.lessonid,
            trainingcategory:this.trainingcategory1,
        }

        if((this.correctanscount/this.quizlistwithanswer.length)*100==100){
            this.modalRef1.hide();
            this.modalRef1 = this.modal.show(template, {class: 'quizmodal'});
            this.markasdonetraninglesson(item,0);
        }

    }
}

/*
setTimeout(()=>{
    //   console.log(this.iscortansarr[i]);
    //   console.log(item.answerlistarr);
    /!*for(let y in item.answerlistarr){
     /!*  console.log(item.answerlistarr[y].iscorrect);
     console.log(this.iscortansarr[i]);
     console.log(item.answerlistarr[y]._id);*!/
     if(item.answerlistarr[y].iscorrect==true && this.iscortansarr[i]==item.answerlistarr[y]._id){
     console.log('right');
     let indexval: any = this.correctansarrid.indexOf(item.answerlistarr[y]._id);
     /!*  this.correctansarrid.splice(indexval, 1);*!/
     if(indexval==-1){
     this.correctansarrid.push(item.answerlistarr[y]._id);
     }
     }
     }*!/

    //  console.log( this.correctansarrid);
},50)*/
