export interface Usecase {
    execute: (...params: unknown) => unknown
}