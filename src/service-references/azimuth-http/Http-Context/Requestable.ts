export interface Requestable {
    body: {[key: string]: any};
    params: {[key: string]: any};
    query: {[key: string]: any};
    user?: {[key: string]: any};
}