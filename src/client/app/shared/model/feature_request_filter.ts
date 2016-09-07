/**
 * Created by refresh on 9/6/16.
 */
export class FeatureRequestFilter {
  employ: string
  client: string
  closed: number
  product_area: string
  priority_dir: string
  field: string
  dir: string
  skip: number
  get: number
  [key: string]: any;

  static getDefaultFilter() {
    let df = new FeatureRequestFilter()
    df.get = 5
    df.priority_dir = 'desc'
    df.field = 'created_at'
    df.dir = 'desc'
    return df
  }
}
