import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Commonservices } from '../app.commonservices';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contract-add-edit',
  templateUrl: './contract-add-edit.component.html',
  styleUrls: ['./contract-add-edit.component.css'],
  providers: [Commonservices]
})
export class ContractAddEditComponent implements OnInit {

  public editorconfig: any = {};
  public contractForm: FormGroup;
  public formBuilder;
  public productList: any;
  public issubmit = 0;
  public id: any;
  public editid: any;
  public formName: string;
  public isReadOnly:boolean;
  constructor(formBuilder: FormBuilder, public _commonservices: Commonservices, public _cookieservice: CookieService, public _http: HttpClient, public route: ActivatedRoute, public router: Router) {
    if(this._cookieservice.get('usertype') == 'rep'){
      this.isReadOnly = true;
    }
    this.formBuilder = formBuilder;

    this.contractForm = this.formBuilder.group({
      contentTop: ['', Validators.required],
      contentBottiom: ['', Validators.required],
      product_id: ['', Validators.required],
      notes: [''],
      status:['']
    });

    this.editorconfig.extraAllowedContent = '*[class](*),span;ul;li;table;td;style;*[id];*(*);*{*}';
  }

  ngOnInit() {

    this.route.params.subscribe(params=>{
      this.id=params['id'];
      console.log(this.id);
    });

    const link = this._commonservices.nodesslurl + 'datalist?token=' + this._cookieservice.get('jwttoken');
    this._http.post(link, { source: 'products',"condition": {"status":true}  })
      .subscribe((res: any) => {
        this.productList = res.res;
        console.log(this.productList);
      });

      if(this.id!=null){
      this.formName = 'Edit';
     this.getedittrainingsection();
        } else {
          this.formName = 'Add';
        }
    
  }

  togglestatus(item: any) {
    let status: any;
}


  contractFormSubmit() {
    console.log(this.contractForm.value);
    this.issubmit = 1;

    /*mark all touch*/
    let x: any;
    for (x in this.contractForm.controls) {
      this.contractForm.controls[x].markAsTouched();
      console.log(this.contractForm.controls[x].valid);
    }

    if (this.contractForm.valid) {
      let data: any;
      data=this.contractForm.value;
      data.created_by = this._cookieservice.get('userid')
    if(this.editid!=null){
      data.id=this.editid;
    }
      let link = this._commonservices.nodesslurl + 'addorupdatedata?token=' + this._cookieservice.get('jwttoken');
      this._http.post(link, { source: 'contractDetails', data: data}) 
        .subscribe((res: any) => {
          console.log(res);
          if (res.status == 'success') {
            this.contractForm.reset();
            this.router.navigateByUrl('/contract-list');
          }
        });
    }
  }
  cancel(){
    if (this.id == '' && this.id == null) {
      this.contractForm.reset();
    }
    this.router.navigateByUrl('/contract-list');
  }


  getedittrainingsection()  {

    console.log('called check');
    const link = this._commonservices.nodesslurl+'datalist?token='+this._cookieservice.get('jwttoken');
    this._http.post(link,{source:'contractDetails',condition:{'_id_object':this.id}})
        .subscribe((res:any)=>{
          
          let datalist2=[];
          datalist2=res.res;
          // this.dataForm.controls['id'].patchValue(datalist2[0]._id);
          this.contractForm.controls['contentTop'].patchValue(datalist2[0].contentTop);
          this.contractForm.controls['contentBottiom'].patchValue(datalist2[0].contentBottiom);
          this.contractForm.controls['product_id'].patchValue(datalist2[0].product_id);
          this.contractForm.controls['notes'].patchValue(datalist2[0].notes);
          this.contractForm.controls['status'].patchValue(datalist2[0].status);
          this.editid = datalist2[0]._id;
        })

  }

}
