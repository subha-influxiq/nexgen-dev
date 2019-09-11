import { Component, OnInit,TemplateRef, Inject } from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var moment:any;
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { WINDOW } from '@ng-toolkit/universal';


@Component({
    selector: 'app-digitalcontract',
    templateUrl: './digitalcontract.component.html',
    styleUrls: ['./digitalcontract.component.css'],
    providers: [Commonservices]
})
export class DigitalcontractComponent implements OnInit {
    public singledata: any;
    public dataForm:FormGroup;
    public dataForm2:FormGroup;
    public dataForm3:FormGroup;
    public kp;
    public sourceconditionval: any;
    public datalist: any;
    public datalist1: any;
    public datalist2: any;
    modalref:BsModalRef;
    public sourceconditionval1:any;
    public sourceconditionval2:any;
    public filterval;
    public filterval1;
    public filterval2;


    constructor(@Inject(WINDOW) private window: Window, public commonservice:Commonservices,public _http:HttpClient,public cookieservice:CookieService,kp:FormBuilder,public modalservices:BsModalService)
    {
        this.kp=kp;
        this.getlegaldocdata();
    }

    ngOnInit()
    {
        this.dataForm = this.kp.group({
            id: [''],
            firstdate: [''],
            firstaddress: [''],
            fullname: [''],
            iftoconsultant1: [''],
            iftoconsultant2: [''],
            iftoconsultant3: [''],
            iftoconsultant4: [''],
            by1: [''],
            by2: [''],
            printname1: ['Tom Willis'],
            printname2: [''],
            title1: ['Principle'],
            title2: ['Consultant'],
            printvalue: [''],
            date2: [''],
            consultant1: [''],
            printname3: [''],
            by3: [''],
            blank1: [''],
            by4: [''],
            printname6: ['Tom Willis'],
            title5: ['Principle'],
            date5: [''],
            printname5: [''],
            title4: ['Consultant'],
            date4: [''],
        });
        this.dataForm2=this.kp.group({
            printvalue:[''],
            date2:[''],
            consultant1:[''],
        });
        this.dataForm3=this.kp.group({
            printname3: [''],
            blank1: [''],
            by4: [''],
            printname5: [''],
            title4: [''],
            date4: [''],
            printname6: ['Tom Willis'],
            title5: ['Principle'],
            date5: [''],
        });
    }
    getlegaldocdata()
    {
        const link = this.commonservice.nodesslurl+'datalist?token='+this.cookieservice.get('jwttoken');
        // this._http.post(link,{source:'rep_view',condition:{contractstep:1}})
        this._http.post(link,{source:'rep_contract_view',condition:{contractstep:1}})
            .subscribe(res=>{
                let result;
                result=res;
                this.singledata=result.res;
                console.log('singledata.......');
                console.log(this.singledata);
            })
    }
    getsignupdetails(id:any,lgModal:TemplateRef<any>) {
        this.modalref=this.modalservices.show(lgModal,{class: 'modal_test'});
        this.sourceconditionval ={_id:id };
        const link = this.commonservice.nodesslurl+'datalist?token='+this.cookieservice.get('jwttoken');
        this._http.post(link,{source:'users',condition:this.sourceconditionval})
            .subscribe(res => {
                let result;
                result = res;
                console.log('Valorhnn');
                console.log(result);
                if(result.status=='error'){
                    //this.router.navigate(['/']);
                }else{
                    this.datalist = [];
                    this.datalist = result.res;
                    console.log('datalist:');
                    console.log(this.datalist);
                    if(this.datalist.length>0){
                        let fulladress;
                        if(this.datalist[0].address2==''){
                            fulladress=this.datalist[0].address1+', '+this.datalist[0].city +', '+this.datalist[0].state+' '+this.datalist[0].zip;
                        }else{
                            fulladress=this.datalist[0].address1+', '+this.datalist[0].address2+ ', '+this.datalist[0].city +', '+this.datalist[0].state+' '+this.datalist[0].zip;
                        }
                        this.dataForm = this.kp.group({
                            id: [this.cookieservice.get('userid')],
                            firstdate: [moment(this.datalist[0].contractsigndate).format("Do, MMM, YYYY")],
                            firstaddress: [fulladress],
                            fullname: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                            iftoconsultant1: [this.datalist[0].iftoconsultant1],
                            iftoconsultant2: [this.datalist[0].iftoconsultant2],
                            iftoconsultant3: [this.datalist[0].iftoconsultant3],
                            iftoconsultant4: [this.datalist[0].iftoconsultant4],
                            by1: [''],
                            // by2: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                            by2: [this.datalist[0].by2],
                            printname1: ['Tom Willis'],
                            printname2: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                            title1: ['Principle'],
                            title2: ['Consultant'],
                            printvalue: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                            // consultant1: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                            consultant1: [this.datalist[0].consultant1],
                            date2: [moment(this.datalist[0].contractsigndate).format("Do, MMM, YYYY")],
                            printname3: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                            by3: [''],
                            blank1: [''],
                            printname6: ['Tom Willis'],
                            title5: ['Principle'],
                            date5: [moment(this.datalist[0].contractsigndate).format("Do, MMM, YYYY")],
                            // by4: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                            by4: [this.datalist[0].by4],
                            printname5: [this.datalist[0].firstname+' '+this.datalist[0].lastname],
                            title4: ['Consultant'],
                            date4: [moment(this.datalist[0].contractsigndate).format("Do, MMM, YYYY")],
                        });
                        if(this.datalist[0].by2==null){
                            this.dataForm.controls['by2'].patchValue(this.datalist[0].firstname+' '+this.datalist[0].lastname);
                        }
                        if(this.datalist[0].by4==null){
                            this.dataForm.controls['by4'].patchValue(this.datalist[0].firstname+' '+this.datalist[0].lastname);
                        }
                        if(this.datalist[0].consultant1==null){
                            this.dataForm.controls['consultant1'].patchValue(this.datalist[0].firstname+' '+this.datalist[0].lastname);
                        }
                    }
                }
            }, error => {
                console.log('Oooops!');
                this.datalist = [];
            });
    }
    getexhibit1(id:any,lgModal1:TemplateRef<any>)
    {
        this.modalref=this.modalservices.show(lgModal1,{class: 'modal_test'});
        this.sourceconditionval1 ={_id:id };
        const link = this.commonservice.nodesslurl+'datalist?token='+this.cookieservice.get('jwttoken');
        this._http.post(link,{source:'users',condition:this.sourceconditionval1})
            .subscribe(res=>{
                let result;
                result=res;
                if(result.status!='error'){
                    this.datalist1 = [];
                    this.datalist1 = result.res;
                    if(this.datalist1.length>0){
                        this.dataForm2=this.kp.group({
                            printvalue: [this.datalist1[0].firstname+' '+this.datalist1[0].lastname],
                            // consultant1: [this.datalist1[0].firstname+' '+this.datalist1[0].lastname],
                            consultant1: [this.datalist1[0].consultant1],
                            date2: [moment(this.datalist1[0].contractsigndate).format("Do, MMM, YYYY")],
                        });
                        if(this.datalist1[0].consultant1==null){
                            this.dataForm2.controls['consultant1'].patchValue(this.datalist1[0].firstname+' '+this.datalist1[0].lastname);
                        }
                    }
                    this.getexhibit2(id,lgModal1);
                }
            },error=>{
                console.log('ooooppps');
                this.datalist1=[];
            });
    }

    getexhibit2(id:any,lgModal2:TemplateRef<any>)
    {
      //  this.modalref=this.modalservices.show(lgModal2,{class: 'modal_test'});
        this.sourceconditionval2 ={_id:id };
        const link = this.commonservice.nodesslurl+'datalist?token='+this.cookieservice.get('jwttoken');
        this._http.post(link,{source:'users',condition:this.sourceconditionval2})
            .subscribe(res=>{
                let result;
                result=res;
                if(result.status!='error'){
                    this.datalist2 = [];
                    this.datalist2 = result.res;
                    if(this.datalist2.length>0){
                        this.dataForm3=this.kp.group({
                            printname3: [this.datalist2[0].firstname+' '+this.datalist2[0].lastname],
                            blank1: [''],
                            // by4: [this.datalist2[0].firstname+' '+this.datalist2[0].lastname],
                            by4: [this.datalist2[0].by4],
                            printname5: [this.datalist2[0].firstname+' '+this.datalist2[0].lastname],
                            title4: [this.datalist2[0].firstname+' '+this.datalist2[0].lastname],
                            date4: [moment(this.datalist2[0].contractsigndate).format("Do, MMM, YYYY")],
                            printname6: ['Tom Willis'],
                            title5: ['Principle'],
                            date5: [moment(this.datalist2[0].contractsigndate).format("Do, MMM, YYYY")]
                        });
                        if(this.datalist2[0].by4==null){
                            this.dataForm3.controls['by4'].patchValue(this.datalist2[0].firstname+' '+this.datalist2[0].lastname);
                        }
                    }
                }
            },error=>{
                console.log('Ooooopssss');
                this.datalist2=[];
            });
    }

    downloadfullcontract(idis) {
        var url = this.commonservice.pdfsslurl + 'nexgenpdf.php?id=' + idis;
        this.window.open(url, '_blank');
    }
    downloadexhibit1contract(idis) {
        var url = this.commonservice.pdfsslurl + 'nexgen-exhibit-a.php?id=' + idis;
        this.window.open(url, '_blank');
    }
    downloadexhibit2contract(idis) {
        var url = this.commonservice.pdfsslurl + 'nexgen-exhibit-b.php?id=' + idis;
        this.window.open(url, '_blank');
    }
    searchbyval() {
        this.filterval = '';
        if (this.filterval1 != '' && this.filterval1 != null) {
            this.filterval = this.filterval1 + '|';
        }
        if (this.filterval2 != '' && this.filterval2 != null) {
            this.filterval = this.filterval2 + '|';
        }
        console.log(this.filterval);
    }

}
