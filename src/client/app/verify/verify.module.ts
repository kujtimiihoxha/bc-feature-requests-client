import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {VerifyComponent} from './index';
import {VerifyService} from "./verify.service";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [VerifyComponent],
  exports: [VerifyComponent],
  providers: [VerifyService]
})
export class VerifyModule {

}
