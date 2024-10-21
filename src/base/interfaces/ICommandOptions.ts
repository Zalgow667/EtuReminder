import { ApplicationCommandOptionType } from "discord.js";
import Category from "../enums/Category";

export default interface ICommandOptions {
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
}
