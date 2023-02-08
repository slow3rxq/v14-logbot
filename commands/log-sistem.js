const Discord = require("discord.js");
const { SelectMenuBuilder, ActionRowBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const wixua = require("croxydb")
module.exports = {
	name: "log-ayarla",
	description: "Log sistemini açar.",
	type: 1,
	options: [],

	run: async (client, interaction, args) => {

//BneWixua#1519 Tarafından yapıldı. Daha fazla altyapı için discord.gg/altyapilar


if(wixua.fetch(`log_${interaction.guild.id}`)) {
    return interaction.reply({ content: "sistem zaten ayarlı", ephemeral: true })
}

        const yetki_embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olmalısın.")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki_embed], ephemeral: true })

        const row1 = new ActionRowBuilder()
        .addComponents(
            new Discord.ChannelSelectMenuBuilder()
                .setCustomId('kanal_log_set')
                .setPlaceholder("📺 Ayarlanacak kanalı seç.")
        )
        const embed = new EmbedBuilder()
        .setDescription("> **Aşşağıdaki menüden log kanalını ayarlayabilirsiniz.** 🛎️")

            interaction.reply({ embeds: [embed], components: [row1] })

        }
        
}