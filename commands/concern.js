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
    const concernString = interaction.options.getString("concern");

    if (userRoles.has(process.env.IRONGUARD)) {
        dmUser(interaction, concernString, process.env.IRONGUARD_COMMERCIAL);
        dmUser(interaction, concernString, process.env.IRONGUARD_LOGISTICAL);
        dmUser(interaction, concernString, process.env.IRONGUARD_MARTIAL);
    } else if (userRoles.has(process.env.RAMHEART)) {
        dmUser(interaction, concernString, process.env.RAMHEART_COMMERCIAL);
        dmUser(interaction, concernString, process.env.RAMHEART_LOGISTICAL);
        dmUser(interaction, concernString, process.env.RAMHEART_MARTIAL);
    } else if (userRoles.has(process.env.RUNEFORGE)) {
        dmUser(interaction, concernString, process.env.RUNEFORGE_COMMERCIAL);
        dmUser(interaction, concernString, process.env.RUNEFORGE_LOGISTICAL);
        dmUser(interaction, concernString, process.env.RUNEFORGE_MARTIAL);
    } else {
        // Do nothing
    }

    // Also report this to the matriarch
    dmUser(interaction, concernString, process.env.MATRIARCH);

    interaction.reply({
        content: "Your concern has been submitted anonymously.",
        ephemeral: true,
    });
};

async function dmUser(interaction, message, userId) {
    const user = await interaction.guild.members
        .fetch(userId)
        .catch(() => null);

    if (!user) return interaction.reply("User not found :(");

    await user.send(message).catch(() => {
        interaction.reply(
            user.displayName +
                " has DMs closed or has no mutual servers with the bot :("
        );
    });
}

export { create, DESCRIPTION, invoke, NAME };
