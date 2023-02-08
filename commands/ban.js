const { Client, EmbedBuilder, PermissionsBitField, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")
const wixua = require("croxydb");
module.exports = {
    name: "ban",
    description: 'Kullanıcıyı Sunucudan Yasaklarsın.',
    type: 1,
    options: [
        {
            name: "kullanıcı",
            description: "Yasaklanıcak Kullanıcıyı Seçin.",
            type: 6,
            required: true
        },
        {
            name: "sebep",
            description: "Hangi Sebepten dolayı yasaklanıcak?",
            type: 3,
            required: true
        },
    ],

//BneWixua#1519 Tarafından yapıldı. Daha fazla altyapı için discord.gg/altyapilar

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({ embeds: [new EmbedBuilder().setDescription('`❌` |  **Üyeleri Yasaklar Yetkisi Yok **')] });
       
        const kullanıcı = interaction.options.getMember('kullanıcı')
        const sebep = interaction.options.getString('sebep')
       
        if (kullanıcı.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({ embeds: [new EmbedBuilder().setDescription("`❌` | **Ban Yetkisi Olduğu İçin Onu Yasaklayamadım.**")] });

        await interaction.guild.members.ban(kullanıcı.user, { reason: `${sebep} (${interaction.user.tag})`  })

        const row1 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("<:icons_ban:1009083306161209375>")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId("bankaldir")
            )
        const embed = new Discord.EmbedBuilder()
            .setTitle("İşlem Başarılı")
            .setDescription("**`✅` | `" + kullanıcı.user.tag + "` Başarıyla Üyeyi Yasakladım**")
            .setFooter({ text: `${interaction.user.tag} Banlayan Yetkili.`, iconURL: interaction.user.displayAvatarURL() })
        interaction.reply({ embeds: [embed], components: [row1] })
        wixua.set(`banli_${interaction.guild.id}`, kullanıcı.id)
    }

};
