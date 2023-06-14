const Discord = require("discord.js");
const { SelectMenuBuilder, ActionRowBuilder, EmbedBuilder } = require('@discordjs/builders');
const wixua = require("croxydb")
module.exports = {
	name: "ayarlar",
	description: "Bot Korumayı Açar",
	type: 1,
	options: [],
	run: async (client, interaction, args) => {


    const server = interaction.guild

    let log = wixua.get(`log_${interaction.guild.id}`)
    let mesajLog = wixua.get(`mesajlog_${interaction.guild.id}`)
    let kufurEngel = wixua.get(`kufurEngel_${interaction.guild.id}`)
    let Banlog = wixua.get(`banLog_${interaction.guild.id}`)

    const embed = new EmbedBuilder()
        .setAuthor({ name: `${server.name} Sunucu Ayarları` })
        .addFields(
            { name: "Log", value: `${log ? "`🟩 Aktif`" : "`🟥 Deaktif`"}`, inline: true },
            { name: "Mesaj log", value: `${mesajLog ? "`🟩 Aktif`" : "`🟥 Deaktif`"}`, inline: true },
            { name: "Küfür engel", value: `${kufurEngel ? "`🟩 Aktif`" : "`🟥 Deaktif`"}`, inline: true },
            { name: "Ban log", value: `${Banlog ? "`🟩 Aktif`" : "`🟥 Deaktif`"}`, inline: true },
        )
        .setThumbnail(server.iconURL({ dynamic: true }))

    interaction.reply({ embeds: [embed] })
    }
}
