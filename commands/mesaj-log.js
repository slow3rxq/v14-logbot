const Discord = require('discord.js')
const wixua = require('croxydb');
const { EmbedBuilder, ActionRowBuilder } = require('@discordjs/builders');

module.exports = {
    name: "mesaj-log",
    description: "Mesaj sisteminin log kanalını ayarlarsınız.",
    type: 1,
    options: [],

    run: async (client, interaction, args) => {

//BneWixua#1519 Tarafından yapıldı. Daha fazla altyapı için discord.gg/npm

    if(!interaction.member.permissions.has("Administrator")) return interaction.reply("Bu Komutu Kullanmak İçin **Yönetici** Yetkisine Sahip Olmalısın!");

    if(wixua.fetch(`mesajlog_${interaction.guild.id}`)) {
        return interaction.reply({ content: "sistem zaten ayarlı", ephemeral: true })
    }

    const log = wixua.get(`log_${interaction.guild.id}`)

    const log_ayarlı_değil = new EmbedBuilder()
            .setDescription("`❌` | **Log kanalı ayarlı değil.**")

        if (!log) return interaction.reply({ embeds: [log_ayarlı_değil], ephemeral: true })


    const row1 = new ActionRowBuilder()
    .addComponents(
        new Discord.ChannelSelectMenuBuilder()
            .setCustomId('mesaj_log_set')
            .setPlaceholder("📺 Ayarlanacak kanalı seç.")
    )
    const embed = new EmbedBuilder()
    .setDescription("> **Aşşağıdaki menüden mesaj log kanalını ayarlayabilirsiniz.** 🛎️")

    
    interaction.reply({embeds: [embed], components: [row1]})
    }
}
