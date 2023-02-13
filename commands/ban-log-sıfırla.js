const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const wixua = require("croxydb")

module.exports = {
    name: "ban-log-sıfırla",
    description: "Ban log sistemini sıfırlar.",
    type: 1,
    options: [],

//BneWixua#1519 Tarafından yapıldı. Daha fazla altyapı için discord.gg/altyapilar

    run: async (client, interaction) => {

        const yetki_embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olmalısın.")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki_embed], ephemeral: true })

        
        const data = wixua.get(`banLog_${interaction.guild.id}`)

        const zaten_yok_embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("`❌` | Ban log sistemi zaten sıfırlanmış! :bell:")

        if (!data) return interaction.reply({ embeds: [zaten_yok_embed], ephemeral: true })

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription("`✅` |  Ban log sistemi başarıyla sıfırlandı! :bell:")

            wixua.delete(`banLog_${interaction.guild.id}`) 

        return interaction.reply({ embeds: [embed], ephemeral: true })
    }
};
