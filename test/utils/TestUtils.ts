import * as Tests from './tests.json';

export class TestHelper {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public static getJSON(forCall: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { data: (Tests as any)[forCall] };
  }
}
