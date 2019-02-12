import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl,FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tranningsection',
  templateUrl: './tranningsection.component.html',
  styleUrls: ['./tranningsection.component.css'],
  providers: [Commonservices]
})
export class TranningsectionComponent implements OnInit {
  public dataForm: FormGroup;
  public es;
  public serverurl;
  public divforhtml=false;

  constructor(es: FormBuilder,public _commonservices: Commonservices)
  {
    this.es=es;
    this.serverurl= _commonservices.nodesslurl;
    this.dataForm=this.es.group({
      title:['',Validators.required],
      description:['',Validators.required],
      filetype:['',Validators.required],
      location:['',Validators.required],
      yesorno:['',Validators.required],
      status:['',Validators.required],
    });
  }
  typefile(){
    this.divforhtml=false;
    if(this.dataForm.value['filetype']=='html'){
      console.log(this.dataForm.value['filetype']);
      this.divforhtml=true;
    }
  }
  dosubmit()
  {
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }

  }

  ngOnInit() {
  }

}
