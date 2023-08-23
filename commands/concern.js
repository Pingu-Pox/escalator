import {
    Client,
    SlashCommandSubcommandBuilder,
    EmbedBuilder,
} from "discord.js";
import {} from "dotenv/config";
import fs from "fs";

const NAME = "concern";
const DESCRIPTION = "Submit a concern anonymously.";

const create = () => {
    const command = new SlashCommandSubcommandBuilder()
        .setName(NAME)
        .setDescription(DESCRIPTION)
        .addStringOption((option) =>
            option
                .setName("concern")
                .setDescription("The concern you'd like to report anonymously.")
                .setRequired(true)
        );
    return command.toJSON();
};

const invoke = async (interaction) => {
    const userRoles = interaction.member.roles.cache;
    // Build embeded message

    if (userRoles.has(process.env.IRONGUARD)) {
        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Concern")
            .setURL(
                "https://docs.google.com/document/d/1CI2Rg3Tz0uzHHSt6Koe7o2_HS25D2BaYUmszU0GKpOY/edit"
            )
            .setDescription(interaction.options.getString("concern"))
            .setThumbnail(
                "https://xn--dnhold-3ya.com/wp-content/uploads/2023/08/astrid-e1692766802329.png"
            )
            .setTimestamp()
            .setFooter({
                text: "This concern was submitted anonymously by a user in clan Ironguard.",
            });
        dmUser(interaction, embed, process.env.IRONGUARD_COMMERCIAL);
        dmUser(interaction, embed, process.env.IRONGUARD_LOGISTICAL);
        dmUser(interaction, embed, process.env.IRONGUARD_MARTIAL);
        dmUser(interaction, embed, process.env.MATRIARCH);
    } else if (userRoles.has(process.env.RAMHEART)) {
        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Concern")
            .setURL(
                "https://docs.google.com/document/d/1CI2Rg3Tz0uzHHSt6Koe7o2_HS25D2BaYUmszU0GKpOY/edit"
            )
            .setDescription(interaction.options.getString("concern"))
            .setThumbnail(
                "https://xn--dnhold-3ya.com/wp-content/uploads/2023/08/astrid-e1692766802329.png"
            )
            .setTimestamp()
            .setFooter({
                text: "This concern was submitted anonymously by a user in clan Ramheart.",
            });
        dmUser(interaction, embed, process.env.RAMHEART_COMMERCIAL);
        dmUser(interaction, embed, process.env.RAMHEART_LOGISTICAL);
        dmUser(interaction, embed, process.env.RAMHEART_MARTIAL);
        dmUser(interaction, embed, process.env.MATRIARCH);
    } else if (userRoles.has(process.env.RUNEFORGE)) {
        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Concern")
            .setURL(
                "https://docs.google.com/document/d/1CI2Rg3Tz0uzHHSt6Koe7o2_HS25D2BaYUmszU0GKpOY/edit"
            )
            .setDescription(interaction.options.getString("concern"))
            .setThumbnail(
                "https://xn--dnhold-3ya.com/wp-content/uploads/2023/08/astrid-e1692766802329.png"
            )
            .setTimestamp()
            .setFooter({
                text: "This concern was submitted anonymously by a user in clan Runeforge.",
            });
        dmUser(interaction, embed, process.env.RUNEFORGE_COMMERCIAL);
        dmUser(interaction, embed, process.env.RUNEFORGE_LOGISTICAL);
        dmUser(interaction, embed, process.env.RUNEFORGE_MARTIAL);
        dmUser(interaction, embed, process.env.MATRIARCH);
    } else {
        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Concern")
            .setURL(
                "https://docs.google.com/document/d/1CI2Rg3Tz0uzHHSt6Koe7o2_HS25D2BaYUmszU0GKpOY/edit"
            )
            .setDescription(interaction.options.getString("concern"))
            .setThumbnail(
                "https://xn--dnhold-3ya.com/wp-content/uploads/2023/08/astrid-e1692766802329.png"
            )
            .setTimestamp()
            .setFooter({
                text: "This concern was submitted anonymously by a user not in a clan. This concern was sent only to you.",
            });
        dmUser(interaction, embed, process.env.MATRIARCH);
    }

    interaction.reply({
        content: "Your concern has been submitted anonymously.",
        ephemeral: true,
    });
};

async function dmUser(interaction, embed, userId) {
    const user = await interaction.guild.members
        .fetch(userId)
        .catch(() => null);

    if (!user) return interaction.reply("User not found :(");

    await user
        .send({
            embeds: [embed],
        })
        .catch(() => {
            interaction.reply(
                user.displayName +
                    " has DMs closed or has no mutual servers with the bot :("
            );
        });
}

export { create, DESCRIPTION, invoke, NAME };
