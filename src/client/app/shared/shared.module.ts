import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SideNavComponent} from './sidenav/index';
import {MaterializeDirective} from 'angular2-materialize';
import {BreadcrumbComponent, BreadcrumbService} from './breadcrumb/index';
import {LayoutComponent} from './layout/index';
import {AuthGuard} from './guard/index';
import {ActionButtonComponent} from './action-button/index';
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';
import {FilterPipe} from './pipes/filter.pipe';
import {RESOURCE_SERVICES} from './resource/index';
import {DateComponent} from './widgets/date/date.component';
import {LoadingService} from './loading/loading.service';
import {LoginGuard} from './guard/login.guard';
import {TinyEditorComponent} from './widgets/editor/tinymce.component';
import {AdminGuard} from "./guard/admin.guard";

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [
    MaterializeDirective,
    SideNavComponent,
    BreadcrumbComponent,
    LayoutComponent,
    ActionButtonComponent,
    Dragula,
    FilterPipe,
    DateComponent,
    TinyEditorComponent
  ],
  exports: [SideNavComponent, Dragula, BreadcrumbComponent, LayoutComponent,TinyEditorComponent,
    CommonModule, FormsModule, RouterModule, MaterializeDirective, FilterPipe, DateComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [DragulaService, BreadcrumbService, LoadingService, AuthGuard,AdminGuard, LoginGuard, ...RESOURCE_SERVICES]
    };
  }
}
