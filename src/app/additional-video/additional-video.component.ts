import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Commonservices } from '../app.commonservices';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer} from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-additional-video',
  templateUrl: './additional-video.component.html',
  styleUrls: ['./additional-video.component.css'],
  providers: [Commonservices]

})
export class AdditionalVideoComponent implements OnInit {

  public categoryid:any;
  public condition:any = {};
  public datalist: any;
  public recphoneno: any;
  public recid: any;
  public loader:any = 0;

  constructor(public activatedRoute:ActivatedRoute, public _commonservices: Commonservices, public _http: HttpClient, public cookie: CookieService, public router: Router, public sanitizer: DomSanitizer) {
    this.categoryid  = this.activatedRoute.snapshot.params.categoryid;
    console.log(this.categoryid);
    this.condition = {source:'videos_view_with_categoryname',condition:{category_object:this.categoryid}};
    console.log(this.condition);
    this.additionalvideos();
   }

  ngOnInit() {
  }
  additionalvideos() {
    this.loader = 1;
    const link = this._commonservices.nodesslurl + 'datalist?token=' + this.cookie.get('jwttoken');
    this._http.post(link, this.condition)
      .subscribe(res => {
        let result;
        result = res;
        if (result.status == 'error') {
          this.router.navigate(['/']);
        } else {
          this.datalist = [];
          this.datalist = result.res;
           console.log('datalist:');
              console.log(this.datalist);
              for(let i in this.datalist){
                if(this.datalist[i].youtube_url!=null){
                    let videourl = this.datalist[i].youtube_url.split('v=');
                    let videoid = videourl[videourl.length - 1];
                    let vurl = videoid;
                    let url = this.datalist[i].youtube_url.replace('watch?v=', 'embed/');
                    this.datalist[i].youtube_url = this.sanitizer.bypassSecurityTrustResourceUrl(url+"?autoplay=1");
                    url = url.split('/');
                    let urlid = url[url.length - 1];
                    this.datalist[i].thumbnail_youtube = this.sanitizer.bypassSecurityTrustResourceUrl("https://i1.ytimg.com/vi/" + urlid + "/0.jpg");
                    this.loader = 0;
                }
            }
          
        }
      }, error => {
        console.log('Oooops!');
        this.datalist = [];
      });
  }
  iframeAutoplay(id:any){
    $( ".playerspan" ).each(function( index ) {
        $( this ).removeClass( "show" );
        $( this ).addClass( "hide" );
        // $( this ).html("");                  //if there is any need to reload the span
      });
      $( ".iframgeimg" ).each(function( index ) {
        $( this ).removeClass( "hide" );
        $( this ).addClass( "show" );
        
      });
    
        setTimeout(()=>{
            $("#iframe_span_"+id).removeClass('hide');
            $("#iframe_span_"+id).addClass('show');
            $("#thumb"+id).addClass('hide');
        },500);
        
    
   
}
}
