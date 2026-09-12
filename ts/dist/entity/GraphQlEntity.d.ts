import { FussyApiDocumentationEntityBase } from '../FussyApiDocumentationEntityBase';
import type { FussyApiDocumentationSDK } from '../FussyApiDocumentationSDK';
import type { Control } from '../types';
import type { GraphQl, GraphQlListMatch, GraphQlCreateData } from '../FussyApiDocumentationTypes';
declare class GraphQlEntity extends FussyApiDocumentationEntityBase<GraphQl> {
    constructor(client: FussyApiDocumentationSDK, entopts: any);
    make(this: GraphQlEntity): GraphQlEntity;
    list(this: any, reqmatch?: GraphQlListMatch, ctrl?: Control): Promise<GraphQlEntity[]>;
    create(this: any, reqdata?: GraphQlCreateData, ctrl?: Control): Promise<GraphQlEntity>;
}
export { GraphQlEntity };
