import * as Tests from './tests.json';

export class TestHelper {
    public static getJSON(forCall: string) {
        return { data: (Tests as any)[forCall] };
    }
}
