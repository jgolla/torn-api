import * as Tests from './tests.json';
import * as TestsV2 from './testsV2.json';

export class TestHelper {
     
    public static getJSON(forCall: string) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return { data: (Tests as any)[forCall] };
    }

     
    public static getJSONV2(forCall: string) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return { data: (TestsV2 as any)[forCall] };
    }
}
