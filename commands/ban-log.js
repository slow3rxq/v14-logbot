const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ChannelSelectMenuBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js")
const wixua = require("croxydb")
module.exports = {
	name: "ban-log",
	description: "Bir kullanıcı birini yasaklarsa belirtilen loga atar!",
	type: 1,
	options: [],

    run: async (client, interaction) => {


if(wixua.fetch(`banLog_${interaction.guild.id}`)) {
    return interaction.reply({ content: "sistem zaten ayarlı", ephemeral: true })
}

            const log_ayarlı_değil = new EmbedBuilder()
            .setDescription("`❌` | **Log kanalı ayarlı değil.**")

            const log = wixua.get(`log_${interaction.guild.id}`)

        if (!log) return interaction.reply({ embeds: [log_ayarlı_değil], ephemeral: true })


        const yetki_embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olmalısın.")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki_embed], ephemeral: true })

    const row1 = new ActionRowBuilder()
    .addComponents(
        new Discord.ChannelSelectMenuBuilder()
            .setCustomId('ban_log_set')
            .setPlaceholder("📺 Ayarlanacak kanalı seç.")
    )
    const embed = new EmbedBuilder()
    .setDescription("> **Aşşağıdaki menüden ban-log kanalını ayarlayabilirsiniz.** 🛎️")

        interaction.reply({embeds: [embed], components: [row1]})


    }



}
