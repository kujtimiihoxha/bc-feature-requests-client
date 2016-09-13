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
import {Component, OnInit, OnDestroy, ViewEncapsulation} from "@angular/core";
import {NotificationsService} from "./notifications.service";
import {AuthService} from "../auth/auth.service";
import {Notification, SocketMessage} from "./notifications.model";
import {WebSocketService} from "../websocket/websocket.service";
declare const $:any,Materialize:any;
/**
 * BreadcrumbComponent.
 * Displays the current location in the header.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
@Component(
  {
    moduleId: module.id,
    selector: 'bc-notifications',
    templateUrl: 'notifications.component.html',
    styleUrls:['notifications.component.css'],
    encapsulation: ViewEncapsulation.None
  }
)
export class NotificationsComponent implements OnInit,OnDestroy {


  constructor(private notificationsService: NotificationsService, private auth: AuthService,private websocket:WebSocketService) {
  }

  get notifications() {
    return this.notificationsService.notifications;
  }
   get viewed (){
     return this.notificationsService.viewed;
   }
  ngOnInit(): void {
    this.notificationsService.getNotifications(this.auth.user().id).subscribe((notifications: Notification[])=> {
      this.notificationsService.setNotifications(notifications);
    });
    this.websocket.handle((message:SocketMessage)=>{
      let notification:Notification =JSON.parse(message.data)
      if( notification.type === 2) {
        console.log(notification)
        var $toastContent = $(`<div>${notification.content.details.description}</div>`);
        //noinspection TypeScriptUnresolvedFunction
        Materialize.toast($toastContent, 4000);
        this.notificationsService.addNotifications(notification.content);
      }
    })
  }
  closeDropdown(){
    $('.notification-btn').dropdown('close');
  }
  readNotifications(){
    this.notificationsService.setViewed(this.auth.user().id);
  }
  ngOnDestroy(): void {
    this.websocket.handle((message:SocketMessage)=>{

    })
  }

}
