import { Events, REST, Collection, Routes } from "discord.js";
import CustomClient from "../../base/classes/CustomClient";
import Event from "../../base/classes/Event"
import Command from "../../base/classes/Command"

export default class Ready extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.ClientReady,
            description: "Ready Event",
            once: true
        })
    }

    Execute() {
        (`${this.client.user?.tag} is now ready`)
        
        const commands: object[] = this.GetJson(this.client.commands)
        const rest = new REST().setToken(this.client.config.token)

        const setCommands: any = rest.put(Routes.applicationGuildCommands(this.client.config.discordClientId, this.client.config.guildId), {
            body: commands
        })

    }

    private GetJson(commands: Collection<string, Command>): object[] {
        const data: object[] =  []

        commands.forEach(command => {
            data.push({
                name: command.name,
                description: command.description,
                options: command.options,
                default_member_permission: command.default_member_permission.toString(),
                dm_permission: command.dm_permission
            })
        });

        return data
    }
}