export class NumsUtil {
  static parseOrNull(n: any) {
    return n == null || isNaN(+n) ? null : +n;
  }
}
