import IHandler from "../interfaces/IHandler"
import path from 'path'
import { glob } from 'glob'
import CustomClient from "./CustomClient"
import Event from './Event'
import Command from "./Command"
import SubCommand from "./SubCommand"

export default class Handler implements IHandler {
    client: CustomClient
        
    constructor(client: CustomClient) {
        this.client = client
    }

    async LoadEvents() {
        const files = (await glob("build/event/**/*.js")).map(filePath => path.resolve(filePath))

        files.map(async ( file: string ) => {
            const event: Event = new(await import(file)).default(this.client)

            if(!event.name) {
                return delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop} doesn't have name`)
            }

            const execute = (...args: any) => event.Execute(...args);

            //@ts-ignore
            if(event.once) this.client.once(event.name, execute)

            //@ts-ignore
            else this.client.on(event.name, execute)
            

            return delete require.cache[require.resolve(file)]
        })
    }

    async LoadCommands() {
        const files = (await glob("build/commands/*.js")).map(filePath => path.resolve(filePath))

        files.map(async ( file: string ) => {
            const command: Command | SubCommand = new(await import(file)).default(this.client)

            if(!command.name) {
                return delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop} doesn't have name`)
            }

            if(file.split("/").pop()?.split(".")[2]) {
                return this.client.subcommands.set(command.name, command)
            }

            this.client.commands.set(command.name, command as Command)

            return delete require.cache[require.resolve(file)]
        })
    }
}