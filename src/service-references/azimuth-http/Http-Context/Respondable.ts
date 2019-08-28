export interface Respondable {
    status(code: number): Respondable;
    send(value: any): Respondable;
}