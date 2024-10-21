import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import Category from "../base/enums/Category";
import CustomClient from "../base/classes/CustomClient";
import Command from "../base/classes/Command";

export default class Test extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "test",
            description: "My first command",
            category: Category.Utilities,
            default_member_permission: PermissionsBitField.Flags.UseApplicationCommands,
            dm_permission: false,
            cooldown: 2,
            options: [
                {
                    name: "subcommand",
                    description: "First command",
                    type: ApplicationCommandOptionType.Subcommand
                }
            ]
        });
    }

    Execute(interaction: ChatInputCommandInteraction) {
        interaction.reply({ content: "Test command has been ran!", ephemeral: true });
    }
}
