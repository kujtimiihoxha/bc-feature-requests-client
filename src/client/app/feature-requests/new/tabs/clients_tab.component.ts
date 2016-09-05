import {Component, Input, EventEmitter, Output, OnInit} from "@angular/core";
import {FeatureRequestModel} from "../../../shared/model/feature_request.model";
import {Client} from "../../../shared/model/client.model";
import {DragulaService} from "ng2-dragula/src/app/providers/dragula.provider";
declare const $: any;
/**
 * Created by refresh on 9/5/16.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-fr-clients',
  templateUrl: 'clients_tab.component.html',
  styleUrls: ["clients_tab.component.css"]
})
export class ClientsTabComponent implements OnInit {
  @Input() details: FeatureRequestModel;
  @Output() detailsChange: EventEmitter<FeatureRequestModel> = new EventEmitter<FeatureRequestModel>();

  @Output() onNext: EventEmitter<void> = new EventEmitter<void>();
  @Output() onPrevious: EventEmitter<void> = new EventEmitter<void>();

  @Input() clients: Client[];
  currentClient: Client;
  clientsTmp: Array<Client> = null
  clientsSelected: Array<Client> = []
  _nameSearch: string = ""
  modalActions = new EventEmitter<string>();
  selectedPriority: number;

  constructor(private dragulaService: DragulaService) {
    dragulaService.dropModel.subscribe((value: any) => {
      let fromContainer = value.splice(3)
      let ToContainer = value.splice(2)
      if ($(fromContainer).attr("data-container") === "parent" && $(ToContainer).attr("data-container") !== "parent") {
        this.handleAdd(value.slice(1))
        this.filterClients(this._nameSearch)
      }
      else if ($(fromContainer).attr("data-container") !== "parent" &&$(ToContainer).attr("data-container") === "parent") {
        this.handleRemove(value.slice(1))
        this.filterClients(this._nameSearch)
      }
    });
  }

  handleAdd(client: any) {
    this.clientsSelected.forEach((cl: Client)=> {
      if (cl.id === $(client).attr("data-uuid")) {
        this.currentClient = cl;
      }
    })
    this.modalActions.emit("openModal")
  }

  handleRemove(client: any) {
    var toRemove: any;
    this.details.clients.forEach((item: any)=> {
      if (item.client_id === $(client).attr("data-uuid")) {
        toRemove = item;
      }
    })
    this.details.clients.splice(this.details.clients.indexOf(toRemove), 1)

  }

  ngOnInit() {
    if (this.clientsTmp === null) {
      this.clientsTmp = this.clients.slice(0, 6)
    }
  }

  next() {
    this.onNext.emit()
  }

  previous() {
    this.onPrevious.emit()
  }


  get nameSearch() {
    return this._nameSearch;
  }

  set nameSearch(value: string) {
    this.filterClients(value)
    this._nameSearch = value
  }

  filterClients(value: string) {
    this.clientsTmp = []
    this.clients.forEach((item: Client)=> {
      let pattern = '^.*' + value + '.*$'
      if ((item.name.match(/pattern/i) || item.description.match('^.*' + value + '.*$')) && this.clientsSelected.indexOf(item) === -1) {
        this.clientsTmp.push(item);
      }
    });
    this.clientsTmp = this.clientsTmp.slice(0, 6)
  }

  closeModel() {
    this.details.clients.push({
      name: this.currentClient.name,
      client_id: this.currentClient.id,
      priority: this.selectedPriority
    })
    this.currentClient = null;
    this.selectedPriority = null;
    this.modalActions.emit("closeModal");
    console.log(this.details)
  }
}