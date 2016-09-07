import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {LoginComponent} from "./index";
import {LoginService} from "./login.service";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule {
}
