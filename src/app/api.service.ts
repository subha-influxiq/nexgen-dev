import { Injectable, Inject } from '@angular/core';
import { Observable, interval, pipe } from 'rxjs';
import { switchMap, map, takeWhile } from 'rxjs/operators';
/*import { environment } from '../../environments/environment';*/
import { HttpClient, HttpHeaders} from '@angular/common/http';
/*import { JwtHelperService } from '@auth0/angular-jwt';
// import { LoggedinService } from '../loggedin.service';*/
import { CookieService } from 'ngx-cookie-service';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';

@Injectable()
export class ApiService {
/*
  private domain =  environment["API_URL"];
  private _url = environment["API_URL"];*/
  public nodesslurl = 'https://api.nexgentesting.com:6027/';
//  constructor(@Inject(WINDOW) private window: Window, @Inject(LOCAL_STORAGE) private localStorage: any, private _http: HttpClient, private _authHttp: HttpClient, public jwtHelper: JwtHelperService, private loggedinService: LoggedinService) {}
  constructor(private _http: HttpClient,public cookie:CookieService) {}


 /* isTokenExpired() {

    // const helper = new JwtHelperService();
    // const decodedToken = helper.decodeToken(localStorage.getItem('id_token'));
    // var isIdTokenExpired = helper.isTokenExpired(localStorage.getItem('id_token'));
    // console.log('refresh_token',localStorage.getItem('refresh_token'))
    // const isRefreshTokenExpired = helper.isTokenExpired(localStorage.getItem('refresh_token'));
    // console.log('id_token isExpired:',isIdTokenExpired)
    // console.log('refresh_token isExpired:',isRefreshTokenExpired)

    // isIdTokenExpired=true;
    if (this.jwtHelper.isTokenExpired() == true){
      this.getRefreshCognitoTokens()
    }

  } 
 
  //ON SUBMIT CHECK IF TOKEN NEEDED REFRESHING
  getRefreshCognitoTokens(){

    console.log('API_SERVICE WE REFRESHED THE TOKENS')
    let body = new URLSearchParams();
    body.set('grant_type', 'refresh_token'); 
    body.set('client_id', environment["pool_app_client_id"]);
    body.set('refresh_token', localStorage.getItem('refresh_token'));

    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(environment['pool_app_client_id'] + ':' + environment['app_client_secret'])
      })
    };

    var result = this._http.post( environment['pool_url'], body.toString(), httpOptions)
        .subscribe(
          response => {
            var token_data_str = response
            var token_data = token_data_str //JSON.parse(token_data_str)
            console.log(Object.keys(token_data))
            localStorage.setItem('id_token',token_data['id_token'])
            localStorage.setItem('access_token',token_data['access_token'])
            console.log('REFRESH token_data',token_data)
          },
          error => {
            let error_json = JSON.parse(error.text())
            console.log(error_json)
            this.loggedinService.announceLoggedin(false);
            window.location.href = environment['signin']
          }
        );

    return result
  } //end getRefreshCognitoTokens()

  refreshToken(){
    var result = this.getRefreshCognitoTokens()
    return result
  }*/
 
  getData(endpoint:string){
    var result = this._http.get(this.getEndpointUrl(endpoint)).pipe(map(res => res));

		return result;
  } //end getData

  
  postData(endpoint:string,source,condition){
      var result =this._http.post(this.getEndpointUrl(endpoint),{source:source,condition:condition}/*JSON.stringify(data)*/).pipe(map(res => res));
      return result;
  } //end postData
  
  
  putData(endpoint:string,data,id:string,is_cache_buster=true){
    if (is_cache_buster==true){
      let ran = Math.floor(Math.random() * 10000) + 1;
      var cache_buster = '?cache=' + ran.toString();
      endpoint = endpoint + cache_buster;
    }
  
    var result =this._http.put(this.getEndpointUrl(endpoint)+'/'+id,JSON.stringify(data)).pipe(map(res => res));
  
    return result;
  } //end putData
 
  
  // deleteData(endpoint:string,id:string){
  //   var result = this._http.delete(this.getEndpointUrl(endpoint)+"/"+id).pipe(map(res => res));
	// 	return result;
  // } //end deleteData

  private getEndpointUrl(endpoint:string){
      return this.nodesslurl + endpoint+'?token='+this.cookie.get('jwttoken');
  }
  customRequest(requestdata: any, endpoint: any) {
    
    var result = this._http.post( endpoint, JSON.stringify(requestdata)).pipe(map(res => res));
    return result;
  }
  


}
