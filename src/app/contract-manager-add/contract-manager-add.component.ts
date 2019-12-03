import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-contract-manager-add',
  templateUrl: './contract-manager-add.component.html',
  styleUrls: ['./contract-manager-add.component.css'],
  providers: [Commonservices]
})
export class ContractManagerAddComponent implements OnInit {
public productlist: any;
public dataForm: any;
public issubmit: number = 0;
  constructor(public _commonservices:Commonservices,public _http:HttpClient, public cookeiservice: CookieService, public fb: FormBuilder) {
    
  //   this.dataForm = this.fb.group({
  //     product: [''],
  //     notes: ['']
  //   });

  //  let link = this._commonservices.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
  //  this._http.post(link, { source: 'products_name' }).subscribe(res => {
  //      let result: any = res;
  //      this.productlist = result.res;
  //      console.log(this.productlist)
  //  });
}


ngOnInit(){

}

// formsubmit() {
//   console.log(this.dataForm.value)
// }

  }
