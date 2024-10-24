import { Collection } from "discord.js";
import { IConfig } from "./IConfig";
import Command from "../classes/Command";
import SubCommand from "../classes/SubCommand";

export interface ICustomClient {
    config: IConfig
    commands: Collection<string, Command>
    subcommands: Collection<string, SubCommand>
    cooldowns: Collection<string, Collection<string, number>>

    Init(): void
    LoadHandler(): void
}