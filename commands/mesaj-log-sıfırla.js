const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const wixua = require("croxydb")

module.exports = {
    name: "mesaj-log-sıfırla",
    description: "Mesaj log sistemini sıfırlar.",
    type: 1,
    options: [],

    run: async (client, interaction) => {


        const yetki_embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olmalısın.")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki_embed], ephemeral: true })

        const data = wixua.get(`mesajlog_${interaction.guild.id}`)

        const zaten_yok_embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("`❌` | Mesaj log sistemi zaten sıfırlanmış! ")

        if (!data) return interaction.reply({ embeds: [zaten_yok_embed], ephemeral: true })

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription("`✅` |  Mesaj log sistemi başarıyla sıfırlandı! ")

            wixua.delete("mesajlog_"+interaction.guild.id)

        return interaction.reply({ embeds: [embed], ephemeral: true })
    }
};
