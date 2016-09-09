import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RegisterComponent} from './index';
import {RegisterService} from "./register.service";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  providers: [RegisterService]
})
export class RegisterModule {

}
