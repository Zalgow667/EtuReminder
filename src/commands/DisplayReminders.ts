import { ChatInputCommandInteraction, EmbedBuilder, PermissionsBitField } from "discord.js";
import Category from "../base/enums/Category";
import CustomClient from "../base/classes/CustomClient";
import Command from "../base/classes/Command";
import Reminder from "./Reminder";

export default class DisplayReminders extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "display",
            description: "Affiche tous les rappels actifs",
            category: Category.Utilities,
            default_member_permission: PermissionsBitField.Flags.UseApplicationCommands,
            dm_permission: false,
            cooldown: 4,
            options: []
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const embed = this.createReminderEmbed();

        await interaction.reply({ embeds: [embed], ephemeral: true });

        setInterval(async () => {
            const updatedEmbed = this.createReminderEmbed();

            await interaction.followUp({ embeds: [updatedEmbed], ephemeral: true });
        }, 3000);

    }

    private createReminderEmbed() {
        const embed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("📅 **Rappels Actifs**")
            .setDescription("Voici tous vos rappels actifs:");

        const activeReminders = Reminder.reminders.filter(reminder => {
            const reminderDate = new Date(reminder.timestamp * 1000);
            return reminderDate.getTime() > Date.now(); 
        });

        if (activeReminders.length === 0) {
            embed.addFields({ name: "Aucun rappel actif", value: "Vous n'avez pas de rappels actifs." });
        } else {
            activeReminders.forEach(reminder => {
                embed.addFields(
                    { name: "📚 - **Cours**", value: `\`${reminder.cours}\``, inline: true },
                    { name: "🗓️ - **Date de Rendu**", value: `<t:${reminder.timestamp}:d> - <t:${reminder.timestamp}:R>`, inline: true },
                    { name: "📝 - **Sujet**", value: `\`${reminder.sujet}\``, inline: true }
                );
            });
        }

        return embed;
    }
}
