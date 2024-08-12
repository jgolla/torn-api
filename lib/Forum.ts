import { TornAPIBase } from './TornAPIBase';
import { Errorable, ForumCategories, ForumThreadBase, ForumThreadExtended, Sort } from './Interfaces';

export class Forum extends TornAPIBase {
    constructor(apiKey: string, comment: string) {
        super(apiKey, comment);
    }

    async categories(): Promise<Errorable<ForumCategories[]>> {
        return this.apiQueryV2({ route: 'forum', selection: 'categories' });
    }

    async thread(id: number): Promise<Errorable<ForumThreadExtended>> {
        return this.apiQueryV2({ route: 'forum', selection: 'thread', id: id });
    }

    async threads(ids?: number[], limit?: number, from?: number, to?: number, sort?: Sort): Promise<Errorable<ForumThreadBase[]>> {
        return this.apiQueryV2({ route: 'forum', selection: 'threads', ids: ids, limit: limit, to: to, from: from, sort: sort });
    }
}
