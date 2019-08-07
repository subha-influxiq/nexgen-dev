import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Commonservices } from "../app.commonservices";
import { HttpClient } from "@angular/common/http";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { CookieService } from "ngx-cookie-service";
@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.css'],
  providers: [Commonservices]
})
export class NotelistComponent implements OnInit {

  public noteForm: FormGroup;
  public issubmit = 0;
  formbuilder:any;
  public modalRef1:BsModalRef;
  public noteslist:any=[];
  public selectednote:any;
  public selecteditem:any;
  public isedit:any=0;
  public message:any='';
  public sourcecondition:any = {};
  public leaddata:any={};
  
  @Input()
    set lead_data(source: any) {
        this.leaddata = (source) || '<no name set>';
        this.leaddata = source;
        // console.log('leaddata:');
        // console.log(this.leaddata);
    }


  constructor(public _commonservice: Commonservices, public router: Router, public _http: HttpClient, public modal: BsModalService, formbuilder: FormBuilder, private cookeiservice: CookieService) {
    this.formbuilder = formbuilder;
    
   }

  ngOnInit() {
    this.noteForm = this.formbuilder.group({
      id: [""],
      note: ["", Validators.required]
    });
    console.log(this.cookeiservice.get('usertype'));
    // console.log(this.leaddata);
    this.sourcecondition = {'created_under_object':this.leaddata._id};
    if(this.cookeiservice.get('usertype')== 'admin'){
      
    }
    if(this.cookeiservice.get('usertype')== 'rep'){
      console.log('leaddata:');
      console.log(this.leaddata);
      // this.sourcecondition = {'created_by_object':this.cookeiservice.get('userid'),'created_under_object':this.leaddata._id};
    }
    this.getnoteslist();
  }
  openform(val:any,template: TemplateRef<any>){
    this.noteForm.reset();
    this.noteForm.clearValidators;
    this.modalRef1 = this.modal.show(template);
  }
  editform(val:any,template: TemplateRef<any>){
    this.selectednote = val;
    this.modalRef1 = this.modal.show(template);
    this.editnoteslist();
  }
  notesubmit(){
    for (let x in this.noteForm.controls) {
      this.noteForm.controls[x].markAsTouched();
    }
    this.selectednote = {};
    this.issubmit = 1;
    console.log(this.noteForm.value);
    if(this.noteForm.valid && this.issubmit==1){
      let link = this._commonservice.nodesslurl+'addorupdatedata';
      let data2 = this.noteForm.value;
      data2.created_by = this.cookeiservice.get('userid');
      data2.created_under = this.leaddata._id;
      
      let postdata:any;
      
      
      if(data2.id!='' && data2.id!=null){
        console.log('not null');
        postdata = { source: 'notes', data: data2, sourceobj: ["created_by","created_under"] };
      }else{
        console.log('null');
        postdata = { source: 'notes', data: {note:this.noteForm.controls['note'].value,created_by:this.cookeiservice.get('userid'),created_under:this.leaddata._id}, sourceobj: ["created_by","created_under"] };
      }
      console.log(postdata);
      this._http.post(link,postdata)
        .subscribe(res=>{
          let result:any;
          result = res;
          console.log(result);
          if(result.status == 'success'){
            this.getnoteslist();
            setTimeout(()=>{
              this.modalRef1.hide();
            },2000);
            
          }
        })
     

     
    }
    
  }
  editnoteslist() {
   
    let link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
    /* console.log('link');
     console.log(link);*/
    console.log('hh---ist----');
    console.log(this.selectednote);
    this._http.post(link, { source: 'notes', condition: {'_id':this.selectednote._id} })
        .subscribe(res => {
            let result;
            result = res;
            if (result.status == 'error') {
                this.router.navigate(['/']);
            } else {
                // this.noteslist = [];
                // this.noteslist = result.res;
                // console.log('noteslist:');
                // console.log(this.noteslist);
                console.log(result.res[0]._id);
                this.noteForm.controls['id'].setValue(result.res[0]._id);
                this.noteForm.controls['note'].setValue(result.res[0].note);

            }
        }, error => {
            console.log('Oooops!');
            this.noteslist = [];
        });
}
getnoteslist() {
  let link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
  /* console.log('link');
   console.log(link);*/
  console.log('hh---ist----');
  this._http.post(link, { source: 'notes_view', condition: this.sourcecondition })
      .subscribe(res => {
          let result;
          result = res;
          if (result.status == 'error') {
              this.router.navigate(['/']);
          } else {
              this.noteslist = [];
              this.noteslist = result.res;
              console.log('noteslist:');
              console.log(this.noteslist);
          }
      }, error => {
          console.log('Oooops!');
          this.noteslist = [];
      });
}
deletdata(val: any, template: TemplateRef<any>) {
  this.modalRef1 = this.modal.show(template);
  this.selecteditem = val;
}
confirmdelete(template: TemplateRef<any>) {
  this.modalRef1.hide();
  this.isedit = 0;
  this.message = "Record deleted successfully!!";
  const link = this._commonservice.nodesslurl + 'deletesingledata?token=' + this.cookeiservice.get('jwttoken');
  /* console.log('link');
   console.log(link);*/
  this._http.post(link, { source: 'notes', id: this.selecteditem._id })
      .subscribe(res => {
          let result;
          result = res;
          this.getnoteslist();
          this.modalRef1 = this.modal.show(template, { class: 'successmodal' });
          setTimeout(() => {
              this.modalRef1.hide();
              this.isedit = 0;
          }, 3000);
      }, error => {
          console.log('Oooops!');
      });

}
nodelete() {
  this.modalRef1.hide();
}

}
