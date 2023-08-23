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
    } else if (userRoles.has(process.env.RAMHEART)) {
    } else if (userRoles.has(process.env.RUNEFORGE)) {
        // get user object
        const user = await interaction.guild.members
            .fetch(process.env.RUNEFORGE_LOGISTICAL)
            .catch(() => null);

        if (!user) return interaction.reply("User not found :(");

        await user.send(concernString).catch(() => {
            interaction.reply(
                user.displayName +
                    " has DMs closed or has no mutual servers with the bot :("
            );
        });
    } else {
        // Do nothing
    }

    // Also report this to the matriarch

    interaction.reply({
        content: "Your concern has been submitted anonymously.",
        ephemeral: true,
    });
};

export { create, DESCRIPTION, invoke, NAME };
