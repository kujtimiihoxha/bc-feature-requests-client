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
    clients:{
      name : string,
      client_id : string,
      priority : number,
    }[]
}
