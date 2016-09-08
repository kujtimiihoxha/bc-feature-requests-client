import {Component} from '@angular/core';
import {LoadingService} from './shared/index';
import {Router, NavigationStart, NavigationEnd} from '@angular/router';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
})

export class AppComponent {

  constructor(private loadingService: LoadingService,router: Router) {
    router.events.subscribe((event:any) => {
      if(event instanceof NavigationStart) {
        loadingService.on();
      } else if(event instanceof NavigationEnd) {
        loadingService.off();
      }
    });
  }
}
