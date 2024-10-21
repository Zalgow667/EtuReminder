import ICommandOptions from "../interfaces/ICommandOptions";
import CustomClient from "../classes/CustomClient";
import Category from "../enums/Category";
import { ChatInputCommandInteraction, CacheType, AutocompleteInteraction } from "discord.js";

export default class Command implements ICommandOptions {
    client: CustomClient;
    name: string;
    description: string;
    category: Category;
    options?: ICommandOptions['options']; 
    default_member_permission: bigint;
    dm_permission: boolean;
    cooldown: number;

    constructor(client: CustomClient, options: ICommandOptions) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.category = options.category;
        this.options = options.options;
        this.default_member_permission = options.default_member_permission;
        this.dm_permission = options.dm_permission;
        this.cooldown = options.cooldown;
    }

    Execute(interaction: ChatInputCommandInteraction<CacheType>): void {}
    AutoComplete(interaction: AutocompleteInteraction<CacheType>): void {}
}
