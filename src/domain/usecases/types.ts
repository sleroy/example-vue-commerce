export interface Usecase {
    execute: (...params: any[]) => unknown
}