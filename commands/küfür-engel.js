const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const wixua = require("croxydb")
const Discord = require("discord.js")
module.exports = {
    name: "küfür-engel",
    description: "Küfür engel sistemini ayarlarsınız!",
    type: 1,
    options: [

        {
            name: "ayarla",
            description: "Küfür engel sistemini ayarlarsınız!",
            type: 5,
            required: true,
        },

    ],

    run: async (client, interaction) => {


        if(wixua.fetch(`kufurEngel_${interaction.guild.id}`)) {
            return interaction.reply({ content: "sistem zaten ayarlı", ephemeral: true })
        }

    const ayarla = interaction.options.getBoolean('ayarla')

        const row1 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("🗑️")
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setCustomId("messageDelete")
            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("⚙️")
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setCustomId("ayarla" + interaction.user.id)
            )

        const yetki = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("Yetersiz Yetki!")
            .setDescription("> Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")


        const ayarlandi = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("Başarıyla Ayarlandı!")
            .setDescription("> **Küfür engel sistemi başarıyla ayarlandı** 🛎️\n\n`⚙️` butonuna basarak ayarlarını yapmaya devam et!")
            .setFooter({ text: "Wixua Tester" })

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true })

        interaction.reply({ embeds: [ayarlandi], components: [row1] })

        wixua.set(`kufurEngel_${interaction.guild.id}`, ayarla) //kanka ben bu true yerine ayarla yazmıştım galiba aynı 

    }

};
