const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const wixua = require("croxydb")

module.exports = {
    name: "küfür-engel-sıfırla",
    description: "Küfür engel sistemini sıfırlar.",
    type: 1,
    options: [],

    run: async (client, interaction) => {

//BneWixua#1519 Tarafından yapıldı. Daha fazla altyapı için discord.gg/npm

        const yetki_embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olmalısın.")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki_embed], ephemeral: true })

        const data = wixua.get(`kufurEngel_${interaction.guild.id}`)//bunu 2sini nasıl sıfırlicak

        const zaten_yok_embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("`❌` | Küfür engel sistemi zaten sıfırlanmış! :bell:")

        if (!data) return interaction.reply({ embeds: [zaten_yok_embed], ephemeral: true })

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription("`✅` |  Küfür engel sistemi başarıyla sıfırlandı! :bell:")

            wixua.delete(`kufurRol_${interaction.guild.id}`)
            wixua.delete(`kufurEngel_${interaction.guild.id}`) 

        return interaction.reply({ embeds: [embed], ephemeral: true })
    }
};
