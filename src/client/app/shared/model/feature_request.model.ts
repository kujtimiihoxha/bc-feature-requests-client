import {BaseModel} from "./base.model";
/**
 * Created by refresh on 9/3/16.
 */
export class FeatureRequest extends BaseModel {
  title: string
  description: string
  target_date: string
  ticket_url: string
  closed: boolean
  product_area_id: string
  product_area_name: string
  clients: {
    name: string,
    client_id: string,
    priority: number,
  }[]
  modifications:{
    user_id: string,
    description: string,
    type: string,
    icon: string,
    created_at: string,
  }
  comments:{
    user_id: string,
    comment: string
  }
}
export class FeatureRequestUpdateDetails {
  title: string
  description: string
  ticket_url: string
  product_area_id: string
  modifications: string[]
}

export class MODIFICATIONS {
  static TITLE_UPDATE = "title_update"
  static DESCRIPTION_UPDATE = "description_update"
  static PRODUCT_ARE_UPDATE = "product_are_update"
  static TICKET_URL_UPDATE = "ticket_url_update"
}
