/**
 * Copyright [2016] [Kujtim Hoxha]
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {BaseResource} from '../resource/base.service';
import {Client} from '../model/index';
import {Observable} from "rxjs";
import {Notification} from "./notifications.model";
/**
 * Notification service.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/2016
 **/
@Injectable()
export class NotificationsService extends BaseResource<Notification> {
  notifications: Notification[];
  viewed = false;

  /**
   * Injects http service.
   * @param http http service.
   */
  constructor(protected http: Http) {
    super(http, 'users');
  }
  /**
   * Get notifications by user id.
   * @param id the id of the item.
   * @returns {Observable<Notifications[]>>} request observable.
   */
  getNotifications(id: string): Observable<Notification[]> {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.get(this.url + `/${id}/notifications`, this.options)
      .map(this.extractData);
  }
  /**
   * Get notifications by user id.
   * @param id the id of the item.
   * @returns {Observable<Notifications[]>>} request observable.
   */
  sendNotificationViewed(id: string): Observable<Notification[]> {
    this.options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    return this.http.put(this.url + `/${id}/notifications/viewed`, null, this.options)
      .map(this.extractData);
  }

  setNotifications(n: Notification[]){
    this.viewed = false;
    this.notifications = n;
  }
  setViewed(id:string){
    if (this.viewed === false ){
      this.sendNotificationViewed(id).subscribe(()=>{});
      this.viewed = true;
    }

  }
  addNotifications(n : any){
    if (typeof this.notifications === 'undefined') {
        this.notifications = [];
    }
    this.notifications.unshift(n);
    this.viewed = false;
  }
}
