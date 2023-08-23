import { SlashCommandBuilder } from "discord.js";
import * as concern from "./concern.js";
import * as suggestion from "./suggestion.js";

const create = () => {
    const command = new SlashCommandBuilder()
        .setName("feedback")
        .setDescription("Base command for the Mediator.")
        .addSubcommand((subcommand) =>
            subcommand
                .setName(concern.NAME)
                .setDescription(concern.DESCRIPTION)
                .addStringOption((option) =>
                    option
                        .setName("concern")
                        .setDescription(
                            "The concern you'd like to report anonymously."
                        )
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName(suggestion.NAME)
                .setDescription(suggestion.DESCRIPTION)
                .addStringOption((option) =>
                    option
                        .setName("suggestion")
                        .setDescription(
                            "The suggestion you'd like to submit anonymously."
                        )
                        .setRequired(true)
                )
        );

    return command.toJSON();
};

const invoke = async (interaction) => {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "concern") {
        await concern.invoke(interaction);
    } else if (subcommand === "suggestion") {
        await suggestion.invoke(interaction);
    } else {
        interaction.reply({
            content: "Invalid subcommand: " + subCommand,
            ephemeral: true,
        });
    }
};

export { create, invoke };
