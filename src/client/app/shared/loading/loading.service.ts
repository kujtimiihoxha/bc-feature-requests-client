import {Injectable} from "@angular/core";
/**
 * Created by refresh on 9/1/16.
 */
@Injectable()
export class LoadingService {
  loading:boolean
  on(){
    this.loading = true;
  }
  off(){
    this.loading = false;
  }
}
