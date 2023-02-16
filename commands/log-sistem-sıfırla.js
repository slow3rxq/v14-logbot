const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const wixua = require("croxydb")

module.exports = {
    name: "log-sıfırla",
    description: "Log sistemini sıfırlar.",
    type: 1,
    options: [],

    run: async (client, interaction) => {


        const yetki_embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olmalısın.")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki_embed], ephemeral: true })

        const data = wixua.get(`log_${interaction.guild.id}`)

        const zaten_yok_embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("`❌` |  Log sistemi zaten sıfırlanmış!")

        if (!data) return interaction.reply({ embeds: [zaten_yok_embed], ephemeral: true })

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription("`✅` |  Log sistemi başarıyla sıfırlandı!")

            wixua.delete("log_"+interaction.guild.id)

        return interaction.reply({ embeds: [embed], ephemeral: true })
    }
};
