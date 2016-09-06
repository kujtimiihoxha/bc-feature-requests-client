/**
 * Created by refresh on 9/6/16.
 */
export class TimestempHelper {
  ISODateString(d: Date) {
    return d.getUTCFullYear() + '-'
      + this.pad(d.getUTCMonth() + 1) + '-'
      + this.pad(d.getUTCDate()) + 'T'
      + this.pad(d.getUTCHours()) + ':'
      + this.pad(d.getUTCMinutes()) + ':'
      + this.pad(d.getUTCSeconds()) + 'Z'
  }

  private pad(n: number) {
    return n < 10 ? '0' + n : n
  }

}

