import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, PermissionsBitField } from "discord.js";
import Category from "../base/enums/Category";
import CustomClient from "../base/classes/CustomClient";
import Command from "../base/classes/Command";

export default class Reminder extends Command {

    static reminders: { cours: string; sujet: string; timestamp: number }[] = [];

    constructor(client: CustomClient) {
        super(client, {
            name: "reminder",
            description: "Create a reminder",
            category: Category.Utilities,
            default_member_permission: PermissionsBitField.Flags.UseApplicationCommands,
            dm_permission: false,
            cooldown: 4,
            options: [
                { 
                    name: "cours",
                    description: "Donne le nom du cours dans lequel le travail doit être rendu",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                { 
                    name: "date",
                    description: "Donne la date de rendu pour ce reminder (format: DD/MM/YYYY)",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                { 
                    name: "heure",
                    description: "Donne l'heure de rendu pour ce reminder (format: HH:mm)",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                { 
                    name: "sujet",
                    description: "Explique brièvement le sujet",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        });
    }

    Execute(interaction: ChatInputCommandInteraction) {
        const cours = interaction.options.getString("cours")!;
        const date: string = interaction.options.getString("date")!;
        const heure: string = interaction.options.getString("heure")!;
        const sujet = interaction.options.getString("sujet")!;

        const [jour, mois, annee] = date.split("/").map(Number);
        const dateFormatted = `${annee}-${mois}-${jour}`;

        const dateTimeString = `${dateFormatted}T${heure}:00`;
        const timestamp = Math.floor(new Date(dateTimeString).getTime() / 1000);
    
        const embed = new EmbedBuilder()
            .setColor("#0099ff") 
            .setTitle("📅 **Nouveau Reminder Créé**")
            .setDescription("**Voici les détails de ton reminder:**")
            .addFields(
                { name: "📚 - **Cours**", value: `\`${cours}\``, inline: false },
                { name: "🗓️ - **Date de Rendu**", value: `<t:${timestamp}:F>`, inline: false }, 
                { name: "📝 - **Sujet**", value: `\`${sujet}\``, inline: false }
            )
            .setImage("https://www.unicaen.fr/wp-content/uploads/2020/10/logos-Marianne-UNICAEN-700x231.jpg") 
            .setFooter({ text: "EtuReminder", iconURL: "https://static.wikia.nocookie.net/leagueoflegends/images/0/07/Karthus_Render.png/revision/latest?cb=20210522020513" })
            .setTimestamp();
    
        Reminder.reminders.push({
            cours,
            sujet,
            timestamp,
        });
        
        interaction.reply({ embeds: [embed] });
    }
}
