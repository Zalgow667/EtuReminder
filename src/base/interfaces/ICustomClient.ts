import { IConfig } from "./IConfig";

export interface ICustomClient {
    config: IConfig
    Init(): void
    LoadHandler(): void
}