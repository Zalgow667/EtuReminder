import { ApplicationCommandOptionType, AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import CustomClient from "../classes/CustomClient";
import Category from "../enums/Category";

export default interface ICommand {
    client: CustomClient;
    name: string;
    description: string;
    category: Category;
    options?: {
        name: string;
        description: string;
        type: ApplicationCommandOptionType;
        required?: boolean;
        choices?: Array<{ name: string; value: string | number }>;
        options?: Array<any>; 
    }[];
    default_member_permission: bigint;
    dm_permission: boolean;
    cooldown: number;

    Execute(interaction: ChatInputCommandInteraction): void;
    AutoComplete(interaction: AutocompleteInteraction): void;
}
