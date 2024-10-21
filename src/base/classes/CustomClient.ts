import { Client, Collection } from "discord.js"
import { ICustomClient } from "../interfaces/ICustomClient"
import { IConfig } from "../interfaces/IConfig"
import Handler from "./Handler"
import Command from "../classes/Command";
import SubCommand from "../classes/SubCommand";

export default class CustomClient extends Client implements ICustomClient
{
    config: IConfig
    handler: Handler
    commands: Collection<string, Command>
    subcommands: Collection<string, SubCommand>
    cooldowns: Collection<string, Collection<string, number>>

    constructor () {
        super({ intents: [] })
        this.config = require(`${process.cwd()}/data/config.json`)
        this.handler = new Handler(this)
        this.subcommands = new Collection()
        this.commands = new Collection()
        this.cooldowns = new Collection()
    }

    Init(): void {
        this.LoadHandler()
        this.login(this.config.token)
            .catch((err) => console.error(err))
    }    

    LoadHandler(): void {
        this.handler.LoadEvents()
        this.handler.LoadCommands()
    }
}
