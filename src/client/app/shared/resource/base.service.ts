import {Http} from '@angular/http';
import {Config} from "../config/env.config";
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
/**
 * Created by refresh on 9/1/16.
 */

export class BaseResource<Model> {
  protected url = Config.API;
  protected headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
  });
  protected options = new RequestOptions({headers: this.headers});

  constructor (protected http: Http, private path:string ) {
    this.url = this.url +path;
  }
  getById(id: string) :Observable<Model> {
    return this.http.get(this.url+'/'+id,this.options)
      .map(this.extractData);
  }

  get() :Observable<Model[]> {
    return this.http.get(this.url,this.options)
      .map(this.extractData);
  }
  put(model:Model) {
    return this.http.put(this.url,JSON.stringify(model),this.options)
      .map(this.extractData);
  }
  delete(id:string) {
    return this.http.delete(this.url+"/"+id,this.options)
      .map(this.extractData);
  }
  post(model:Model) {
    return this.http.post(this.url,JSON.stringify(model),this.options)
      .map(this.extractData);
  }
  protected extractData(res: any) {
    let body = res.json();
    return body || { };
  }
}
