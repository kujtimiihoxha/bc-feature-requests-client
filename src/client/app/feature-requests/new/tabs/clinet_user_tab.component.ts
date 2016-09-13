
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FeatureRequest, AuthService} from '../../../shared/index';
import {User as AuthUser} from '../../../shared/auth/user.model'

@Component({
  moduleId: module.id,
  selector: 'bc-fr-client-user',
  templateUrl: 'client_user_tab.component.html'
})
export class ClientUserTabComponent {
  /**
   * The feature request that will be sent to the server.
   */
  @Input() details: FeatureRequest;
  user:AuthUser;
  /**
   * The details changed event emitter, used for bidirectional binding.
   */
  @Output() detailsChange: EventEmitter<FeatureRequest> = new EventEmitter<FeatureRequest>();

  /**
   * On next event emitter, is emitted when the next button is clicked.
   */
  @Output() onNext: EventEmitter<void> = new EventEmitter<void>();

  /**
   * On previous event emitter, is emitted when the previous button is clicked.
   */
  @Output() onPrevious: EventEmitter<void> = new EventEmitter<void>();


  /**
   * The selected priority.
   * Is reset for ech client.
   */
  selectedPriority: number;

  constructor(private auth: AuthService){
    this.user = this.auth.user();
  }

  /**
   * Go to the next tab.
   */
  next() {
    this.details.clients.push({
      name: this.user.clientname,
      client_id: this.user.clientId,
      priority: this.selectedPriority
    });
    this.onNext.emit();
  }

  /**
   * Fo tho the previouse tab.
   */
  previous() {
    this.onPrevious.emit();
  }

}
