import { Client, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import {} from "dotenv/config";
import fs from "fs";

const NAME = "concern";
const DESCRIPTION = "Submit a concern anonymously.";

const create = () => {
    const command = new SlashCommandBuilder()
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
        dmUser(
            interaction,
            embed,
            process.env.IRONGUARD_COMMERCIAL,
            "Ironguard Commcercial"
        );
        dmUser(
            interaction,
            embed,
            process.env.IRONGUARD_LOGISTICAL,
            "Ironguard Logistical"
        );
        dmUser(
            interaction,
            embed,
            process.env.IRONGUARD_MARTIAL,
            "Ironguard Martial"
        );
        dmUser(interaction, embed, process.env.MATRIARCH, "Matriarch");
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
        dmUser(
            interaction,
            embed,
            process.env.RAMHEART_COMMERCIAL,
            "Ramheart Commercial"
        );
        dmUser(
            interaction,
            embed,
            process.env.RAMHEART_LOGISTICAL,
            "Ramheart Logistical"
        );
        dmUser(
            interaction,
            embed,
            process.env.RAMHEART_MARTIAL,
            "Ramheart Martial"
        );
        dmUser(interaction, embed, process.env.MATRIARCH, "Matriarch");
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
        dmUser(
            interaction,
            embed,
            process.env.RUNEFORGE_COMMERCIAL,
            "Runeforge Commercial"
        );
        dmUser(
            interaction,
            embed,
            process.env.RUNEFORGE_LOGISTICAL,
            "Runeforge Logistical"
        );
        dmUser(
            interaction,
            embed,
            process.env.RUNEFORGE_MARTIAL,
            "Runeforge Martial"
        );
        dmUser(interaction, embed, process.env.MATRIARCH, "Matriarch");
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
        dmUser(interaction, embed, process.env.MATRIARCH, "Matriarch");
    }

    interaction.reply({
        content: "Your concern has been submitted anonymously.",
        ephemeral: true,
    });
};

async function dmUser(interaction, embed, userId, roleMsg) {
    const user = await interaction.guild.members
        .fetch(userId)
        .catch(() => null);

    if (!user) {
        console.log(roleMsg + " user wasn't found!");
    } else {
        console.log(
            interaction.member.displayName +
                " has received concern:" +
                interaction.options.getString("concern")
        );
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
}

export { create, DESCRIPTION, invoke, NAME };
