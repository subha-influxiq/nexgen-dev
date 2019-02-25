import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [Commonservices]
})
export class DashboardComponent implements OnInit {
    public repdetails;
    public legaldocs;
    public traininglessondeteils;

    constructor(public router:Router,public http:HttpClient,public cookie:CookieService,public commonservices:Commonservices)
    {
        this.commonservices=commonservices;
        if(this.cookie.get('userid')!=null){
            this.getreplist();
            this.gettraininglession();
            this.getlegaldocs();
        }
    }
    ngOnInit() {
    }
    getreplist()
    {
        console.log('userid');
        console.log(this.cookie.get('userid'));
        const link = this.commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken');
        this.http.post(link,{source:'users',condition:{type:'rep'}})
            .subscribe(res=>{
                let result;
                result=res;
                console.log('result.......');
                console.log(result);
                if(result.status=='error'){
                    console.log('Oopsss');
                }else {
                    this.repdetails=result.res;
                    console.log('Get Rep Data');
                    console.log(this.repdetails);
                }
            })
    }
    getlegaldocs()
    {
        const link = this.commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken');
        // this.http.post(link,{source:'legaldocuser_view'})
        this.http.post(link,{source:'user_regional_legaldoc_view'})
    .subscribe(res=>{
                let result;
                result=res;
                console.log('result.......');
                console.log(result);
                if(result.status=='error'){
                    console.log('Oopsss');
                }else {
                    this.legaldocs=result.res;
                    console.log('Get legaldocs Data');
                    console.log(this.legaldocs);
                }
            })
    }
    gettraininglession()
    {
        const link = this.commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken');
        this.http.post(link,{source:'traininglesson'})
            .subscribe(res=>{
                let result;
                result=res;
                if(result.status=='error'){
                    console.log('Oopss');
                }else {
                    this.traininglessondeteils=result.res;
                    console.log('Get traininglesson data');
                    console.log(this.traininglessondeteils);
                }
            })
}
}
