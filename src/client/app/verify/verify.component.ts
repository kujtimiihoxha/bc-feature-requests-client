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
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {User} from '../shared/index';
import {VerifyService} from './verify.service';
declare const Materialize: any;
/**
 * VerifyComponent.
 * Used to verify email.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
@Component({
  moduleId: module.id,
  selector: 'bc-verify',
  templateUrl: 'verify.component.html',
})
export class VerifyComponent implements OnInit {
  /**
   * If verified display the thank you message.
   */
  verified:boolean = false;

  /**
   * Verification id.
   */
  id:string;

  /**
   * Verified user firstname.
   */
  firstname:string;

  /**
   * Verification error message.
   */
  errorMessage:string;

  /**
   * If true display the error message.
   */
  error:boolean = false;

  /**
   * Injects router and verify service.
   * @param route used to navigate to login if verification successful and user clicks login button.
   * @param verifyService used to send the verification request.
   */
  constructor(private route: ActivatedRoute, private verifyService: VerifyService) {}

  /**
   * Get the verification id from the route.
   * Check id validity.
   * Send the verification request.
   */
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (!this.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
      this.errorMessage = 'The link provided is not valid.';
      this.error = true;
    }
    this.verifyService.put(this.id,null).catch((error: any)=> {
      //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
      this.error = true;
      //noinspection TypeScriptUnresolvedVariable
      this.errorMessage = JSON.parse(error._body).message;
      return Observable.empty();
    }).subscribe((response: User)=> {
      //noinspection TypeScriptUnresolvedVariable
      this.firstname = response.first_name;
      //noinspection TypeScriptUnresolvedFunction
      this.verified = true;
    });
  }
}
