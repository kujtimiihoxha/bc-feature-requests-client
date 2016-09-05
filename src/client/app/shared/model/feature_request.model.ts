/**
 * Created by refresh on 9/3/16.
 */
export class FeatureRequestModel{
    title: string
    description: string
    target_date: string
    ticket_url: string
    product_area_id: string
    product_area_name: string
    clients:{
      name : string,
      client_id : string,
      priority : number,
    }[]
}
