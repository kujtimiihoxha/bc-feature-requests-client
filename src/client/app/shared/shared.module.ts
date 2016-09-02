import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {SideNavComponent} from './sidenav/index';
import {NameListService} from './name-list/index';
import {MaterializeDirective} from "angular2-materialize";
import {BreadcrumbComponent, BreadcrumbService} from "./breadcrumb/index";
import {LayoutComponent} from "./layout/index";
import {AuthGuard} from "./guard/index";
import {ActionButton} from "./action-button/index";
import {Dragula, DragulaService} from "ng2-dragula/ng2-dragula";

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    MaterializeDirective,
    SideNavComponent,
    BreadcrumbComponent,
    LayoutComponent,
    ActionButton,
    Dragula
  ],
  exports: [SideNavComponent, Dragula,BreadcrumbComponent, LayoutComponent,
    CommonModule, FormsModule, RouterModule, MaterializeDirective]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NameListService, DragulaService, BreadcrumbService, AuthGuard]
    };
  }
}
