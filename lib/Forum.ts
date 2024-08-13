import { TornAPIBase } from './TornAPIBase';
import { Errorable, ForumCategories, ForumPosts, ForumThreadBase, ForumThreadExtended, PostContentType, Sort } from './Interfaces';

export class Forum extends TornAPIBase {
    constructor(apiKey: string, comment: string) {
        super(apiKey, comment);
    }

    /**
     * It is possible to get threads from returned public categories
     * @returns ForumCategories[]
     */
    async categories(): Promise<Errorable<ForumCategories[]>> {
        return this.apiQueryV2({ route: 'forum', selection: 'categories' });
    }

    /**
     * Returns 20 posts per page for the specific thread.
     * @param id Thread id
     * @param offset
     * @param cat PostContentType, plain | raw
     * @returns ForumPosts
     */
    async posts(id: number, offset: number, cat: PostContentType): Promise<Errorable<ForumPosts>> {
        return this.apiQueryV2({ route: 'forum', selection: 'posts', id: id, cat: cat, offset: offset });
    }

    /**
     * Return the details of a thread including topic content and poll (if any).
     * @param id Thread id
     * @returns ForumThreadExtended
     */
    async thread(id: number): Promise<Errorable<ForumThreadExtended>> {
        return this.apiQueryV2({ route: 'forum', selection: 'thread', id: id });
    }

    /**
     * Returns a list of threads for the chosen forum category (or categories)
     * @param ids The forum ID or a list of forum IDs
     * @param limit Limits the number of returned results
     * @param from Returns threads created after this timestamp
     * @param to Returns threads created before this timestamp
     * @param sort Sorted by the greatest of first_post_time and last_post_time timestamps, ASC | DESC
     * @returns ForumThreadBase[]
     */
    async threads(ids?: number[], limit?: number, from?: number, to?: number, sort?: Sort): Promise<Errorable<ForumThreadBase[]>> {
        return this.apiQueryV2({ route: 'forum', selection: 'threads', ids: ids, limit: limit, to: to, from: from, sort: sort });
    }
}
