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
    public getonedetails: any;
    public totalreptraining: any;
    public totalnewhiretraining: any;
    public traininglist: any;

    constructor(public router:Router,public http:HttpClient,public cookie:CookieService,public commonservices:Commonservices, private route: ActivatedRoute)
    {
        this.commonservices=commonservices;
        if(this.cookie.get('userid')!=null){
            this.gettrainingsection();
          //  this.getreplist();
            this.gettraininglession();
            this.getlegaldocs();
        }
    }
    ngOnInit()
    {
        this.trainingcenterdetails();

        this.route.data.forEach((data) => {
            console.log('resolve route data ... ');
            console.log('json',data['results']);
            this.repdetails=data['results'].res;

        });
    }
    gettrainingsection()
    {
        const link = this.commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken');
        this.http.post(link,{source:'traininglesson'})
            .subscribe(res=> {
                    let result:any;
                    result = res;
                    this.traininglist=[];
                    this.traininglist=result.res;
                },
                error=>{
                    console.log("Can not get");
                });
    }
  /*  getreplist()
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
    }*/
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
    trainingcenterdetails()
    {
        const link = this.commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken');
        this.http.post(link,{source:'user_training'})
            .subscribe(res=>{
                let result;
                result=res;
                this.getonedetails=result.res;
                console.log('Get Onedetails');
                console.log(this.getonedetails);
            });

             const link1 = this.commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken');
            this.http.post(link1,{source:'training_group'})
                .subscribe(res=>{
                    let result;
                    result=res;
                    console.log('training group  details');
                    console.log(result);

                    if(result['res']!=null && result['res'][0]!=null && result['res'][0]['_id']=='New Hire Trainning' ){
                        this.totalnewhiretraining=result['res'][0]['count'];
                    }

                    if(result['res']!=null && result['res'][0]!=null && result['res'][0]['_id']=='Rep Trainning Table' ){
                        this.totalreptraining=result['res'][0]['count'];
                    }
                    if(result['res']!=null && result['res'][1]!=null && result['res'][1]['_id']=='New Hire Trainning' ){
                        this.totalnewhiretraining=result['res'][1]['count'];
                    }

                    if(result['res']!=null && result['res'][1]!=null && result['res'][1]['_id']=='Rep Trainning Table' ){
                        this.totalreptraining=result['res'][1]['count'];
                    }


                });



    }
}
