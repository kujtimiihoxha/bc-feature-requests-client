/**
 * Created by refresh on 9/7/16.
 */
import {Component, OnInit, Input} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {
  FeatureRequest,
  ProductArea,
  BreadcrumbService,
  Client,
  User,
} from "../../shared/index";
@Component({
  moduleId: module.id,
  selector: 'bc-feature-request-details',
  templateUrl: 'feature_request_details.component.html',
  styleUrls: ['feature_request_details.component.css'],
})
export class FeatureRequestDetailsComponent implements OnInit {
  /**
   * The feature request.
   */
  @Input() featureRequest: FeatureRequest


  /**
   * Clients list.
   * Contains all the clients.
   * It is used to store clients for filtering,
   *  and other places where clients are needed to be displayed on the table.
   */
  @Input() clients: Client[ ];

  /**
   * Users list.
   * Contains all the users.
   * It is used to store users for filtering,
   *  and other places where users are needed to be displayed on the table.
   */
  @Input() users: User[ ];


  /**
   * ProductArea list.
   * Contains all the product areas.
   * It is used to store product areas for filtering,
   *  and other places where product areas are needed to be displayed on the table.
   */
  @Input() productAreas: ProductArea[ ];

  constructor(private breadcrumb: BreadcrumbService, private route: ActivatedRoute) {
  }
  /**
   * Find the product area name from the {@link #productAreas} list.
   * Is used because the feature request is stored with the product area id  not the name,
   *  and we need the name to be displayed in the dropdown and/or other places.
   * @param id the id of the product area.
   * @returns {string} the product area name.
   * @throws Error if no product area with given id found.
   */
  getProductAreaName(id: string): string {
    for (var i = 0; i < this.productAreas.length; i++) {
      if (this.productAreas[i].id === id) {
        return this.productAreas[i].name;
      }
    }
    throw `Could not find product area with id: ${id}`;
  }

  /**
   * Find the client name from the {@link #clients} list.
   * Is used because the feature request has an array of clients with client id not the name,
   *  and we need the name to be displayed in the dropdown and/or other places.
   * @param id the id of the client.
   * @returns {string} the client name.
   * @throws Error if no product area with given id found.
   */
  getClientName(id: string) {
    for (var i = 0; i < this.clients.length; i++) {
      if (this.clients[i].id === id) {
        return this.clients[i].name;
      }
    }
    throw `Could not find client with id: ${id}`;
  }

  /**
   * Find the employ username from the {@link #users} list.
   * Is used because the feature request is stored with the employ id  not the name,
   *  and we need the name to be displayed in the dropdown and/or other places.
   * @param id the id of the employ.
   * @returns {string} the employ name.
   * @throws Error if no employ with given id found.
   */
  getEmployUsername(id: string) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        return this.users[i].username;
      }
    }
    throw `Could not find client with id: ${id}`;
  }
  ngOnInit(): void {
    this.featureRequest = this.route.snapshot.data['featureRequest']
    this.users = this.route.snapshot.data['users']
    this.productAreas = this.route.snapshot.data['productAreas']
    this.clients = this.route.snapshot.data['clients']
    this.breadcrumb.setItems(['Feature Requests', 'Details'])
  }
  onClick(){
    console.log("Test")
  }
}
