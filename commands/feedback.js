import { SlashCommandBuilder } from "discord.js";
import * as concern from "./concern.js";

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
        );

    return command.toJSON();
};

const invoke = async (interaction) => {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "concern") {
        await concern.invoke(interaction);
    } else {
        interaction.reply({
            content: "Invalid subcommand: " + subCommand,
            ephemeral: true,
        });
    }
};

export { create, invoke };
