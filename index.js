const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder, codeBlock } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
const wixua = require("croxydb")
const wixuadb = require("orio.db")
const { AuditLogEvent, Events } = require('discord.js');
const client = new Client({
  intents: INTENTS,
  allowedMentions: {
    parse: ["users"]
  },
  partials: PARTIALS,
  retryLimit: 32
});

//BneWixua#1519 Tarafından yapıldı. Daha fazla altyapı için discord.gg/altyapilar

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs");
const { TOKEN } = require("./config.json");
const { Modal } = require("discord-modals");
const { log } = require("console");
const { channel } = require("diagnostics_channel");
const dbManager = require("orio.db/src/util/dbManager");
const { exec } = require("child_process");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: false,
        type: 1
    });

    console.log(`[BOT] ${props.name} komutu yüklendi.`)

});

//BneWixua#1519 Tarafından yapıldı. Daha fazla altyapı için discord.gg/altyapilar
readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(`[EVENT] ${name} eventi yüklendi.`)
});


client.login(TOKEN)


client.on('interactionCreate', async (interaction) => {
  if(interaction.isChannelSelectMenu()) {
    if(interaction.customId === "kanal_log_set") {
      if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return
          let data = wixua.get(`log_${interaction.guild.id}`)
          if(data) return;
    
          const sistem_kapali = new EmbedBuilder()
          .setDescription("> **Kayıt sistemi başarıyla ayarlandı** 🛎️\n\n`⚙️` butonuna basarak ayarlarını yapmaya devam et!")
          .setThumbnail(interaction.user.avatarURL({ dynamic: true }) || "https://cdn.discordapp.com/icons/997487954626883692/a_5f604fa4cdf5a6b25571777b02575d51.gif" || null)
            .setFooter({ text: "Sistemi sıfırlamak için /log-sistem-sıfırla komudunu kullanabilirsin!" })

          wixua.set("log_"+interaction.guild.id, interaction.values[0])  
          return interaction.update({ content: "", embeds: [sistem_kapali], components: [] })
    }
  }
})

//BneWixua#1519 Tarafından yapıldı. Daha fazla altyapı için discord.gg/altyapilar

client.on("messageCreate", (message) => {
  const wixua = require("croxydb")
  let kufur = wixua.fetch(`kufurEngel_${message.guild.id}`)
  yetki = wixua.get(`kufurRol_${message.guild.id}`)

  if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return
  if (message.member.roles.cache.has(yetki)) return
  if (!kufur) return;

 
//BneWixua#1519 Tarafından yapıldı. Daha fazla altyapı için discord.gg/altyapilar

  const embed = new Discord.EmbedBuilder()
      .setDescription(`> Bu sunucuda küfür etmek **yasaktır**!`)
      .setColor("Red")

      const row1 = new Discord.ActionRowBuilder()

      .addComponents(
          new Discord.ButtonBuilder()
              .setEmoji("🚫")
              .setLabel("Üyeyi Sustur")
              .setStyle(Discord.ButtonStyle.Primary)
              .setCustomId("sustur")
      )

//BneWixua#1519 Tarafından yapıldı. Daha fazla altyapı için discord.gg/altyapilar

  if (kufur) {
      const kufurler = [

          "amk",
          "piç",
          "yarrak",
          "oç",
          "göt",
          "amq",
          "yavşak",
          "amcık",
          "amcı",
          "orospu",
          "sikim",
          "sikeyim",
          "aq",
          "mk",
          "sex",
          "seks",
          "sik",
          "taşşak",
          "taşak",
          "daşak",
          "daşşak",
          "siq",
          "meme",
          "g0t",
          "g*t",
          "kahpe",
          "pezevenk",
          "sürtük",
          "ibne",
          "kaltak",
          "orispi",
          "puşt",
          "porno",
          "porn"

      ]

      if (kufurler.some(rel => message.content.toLowerCase().includes(rel))) {
          message.delete()
          message.channel.send({ content: `<@${message.author.id}>`, embeds: [embed], components: [row1]}).then(mesaj => {
              wixuadb.set(`userss_${mesaj.id}`, message.author.id)
          })
      }
  }
})

client.on("interactionCreate", (message) => {
    const row1 = new Discord.ActionRowBuilder()

        .addComponents(
            new Discord.ButtonBuilder()
                .setEmoji("🔓")
                .setLabel("Susturmayı Kaldır")
                .setStyle(Discord.ButtonStyle.Primary)
                .setCustomId("susturma")
        )

//BneWixua#1519 Tarafından yapıldı. Daha fazla altyapı için discord.gg/altyapilar

    if (!message.isButton()) return;
    if (message.customId === "sustur") {
        message.deferUpdate()
        let yetki = wixua.get(`kufurRol_${message.guild.id}`)
        if (!message.member.roles.cache.has(yetki)) return

        var uye = wixuadb.get(`userss_${message.message.id}`)
        const basari = new Discord.EmbedBuilder().setTitle("Başarılı!").setDescription(`✅ | <@${uye}> adlı üye \`6\` dakika susturuldu!`).setColor("Green")

        if (!uye) return message.reply({ content: "Üye bulunamadı!", ephemeral: true })
        message.guild.members.cache.get(uye).timeout(360000)
        message.channel.send({ embeds: [basari], components: [row1], }).then(mesaj => {
            wixuadb.set(`userss_${mesaj.id}`, uye) 

        })

    }
    if (message.customId === "susturma") {
        let yetki = wixua.get(`kufurRol_${message.guild.id}`)
        var uye = wixuadb.get(`userss_${message.message.id}`)

        if (!message.member.roles.cache.has(yetki)) return

        if (!uye) return
        message.guild.members.cache.get(uye).timeout(1000)
        const unmute = new Discord.EmbedBuilder().setTitle("Başarıyla Kaldırıldı!").setDescription(`<@${uye}> adlı üyenin susturmasını **kaldırdım**!`).setColor("Green")
        wixuadb.delete(`userss_${message.message.id}`)

        message.update({ embeds: [unmute], components: [] })
    }
})

//BneWixua#1519 Tarafından yapıldı. Daha fazla altyapı için discord.gg/altyapilar


  client.on('messageDelete',async message => {
    
   let logkanal = wixua.get(`mesajlog_${message.guild.id}`)
   if (!logkanal) return;
  
   const kontrol = message.guild.channels.cache.get(logkanal)
   if (!kontrol) {
  
    wixua.delete(`mesajlog_${message.guild.id}`)
  return;
   }
  
  let me = client.user.id
  if (!message.author?.bot) {
      if (!message.author.bot !== me) {
      setTimeout(() => {
        

        const messagedelete = new EmbedBuilder()
        .setColor("Red")
        .setAuthor({name: `${message.author.tag} Adlı kişinin mesajı silindi`, iconURL: message.author.avatarURL({ dynamic: true })})
        .setThumbnail(message.author.avatarURL({ dynamic: true }) )
        .setFields([
        
        {
            name: "Silinen mesaj:",
            value: "```"+message.content+"```",
            inline: true
          },
        ])
        .setTimestamp()

        kontrol.send({embeds: [messagedelete]})
        }, 1000)
      }
  
    }
  })
  
  
  client.on('messageUpdate',async (oldMessage, message) => {
    
    let logkanal = wixua.get(`mesajlog_${message.guild.id}`)
    if (!logkanal) return;
   
    const kontrol = message.guild.channels.cache.get(logkanal)
    if (!kontrol) {
   
        wixua.delete(`mesajlog_${message.guild.id}`)
   return;
    }
   
   let me = client.user.id
   if (!message.author?.bot) {
       if (!message.author.id !== me) {
       setTimeout(() => {
   
         const messageUptade = new EmbedBuilder()
         .setColor("Yellow")
         .setAuthor({name: `${message.author.tag} Adlı kişi mesajını düzenlendi`, iconURL: message.author.avatarURL({ dynamic: true })})
         .setFields([
         {
          name: "Eski Mesaj:",
          value: "```"+oldMessage.content+"```",
          inline: true
        },
        {
          name: "Yeni Mesaj:",
          value: "```"+message.content+"```",
          inline: false
        },
      ])
      .setThumbnail(message.author.avatarURL({ dynamic: true }) )
         .setTimestamp()

         kontrol.send({embeds: [messageUptade]}).catch(e => { })
         }, 1000)
       }
   
     }
   })


   client.on('interactionCreate', async (interaction) => {

      if(interaction.customId === "mesaj_log_set") {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return
            let data = wixua.get(`mesajlog_${interaction.guild.id}`)
            if(data) return;
      
            const sistem_kapali = new EmbedBuilder()
            .setDescription("> **Mesaj log sistemi başarıyla ayarlandı** 🛎️")
              .setFooter({ text: "Sistemi sıfırlamak için /mesaj-log-sıfırla komudunu kullanabilirsin!" })
  
            wixua.set("mesajlog_"+interaction.guild.id, interaction.values[0])  
            return interaction.update({ content: "", embeds: [sistem_kapali], components: [] })
      }

      if (interaction.customId === "ayarla" + interaction.user.id) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: "yetkin yok", ephemeral: true })
    
        let data = wixua.get(`kufurEngel_${interaction.guild.id}`)
        if(!data) return;

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("⚙️")
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true)
                    .setCustomId("ayarla" + interaction.user.id)
            )
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("🗑️")
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId("mesaji-sil" + interaction.user.id)
            )

        const row2 = new ActionRowBuilder()
            .addComponents(
                new Discord.RoleSelectMenuBuilder()
                    .setCustomId('kufur_yetkili_set')
                    .setPlaceholder("🍁 Yetkili rolünü seç.")
                    .setMinValues(1)
            )


    
        const ayarlar_embed = new EmbedBuilder()
            .setDescription("> Aşağıdaki menüyü kullanarak yetkili rolünü ayarlayabilirsiniz.")
            
       return interaction.update({ content: "", embeds: [ayarlar_embed], components: [row2] })

  
      }
    })

    client.on("interactionCreate", async(interaction) => {
      if(interaction.isRoleSelectMenu()) {
            console.log("BneWixua#1519 tarafından yapıldı daha fazla altyapı için discord.gg/altyapilar")

            wixua.set(`kufurRol_${interaction.guild.id}`, interaction.values[0])

            const sistem_kapali = new EmbedBuilder()
            .setDescription("> **Kayıt sistemi başarıyla ayarlandı** 🛎️\n\n`⚙️` butonuna basarak ayarlarını yapmaya devam et!")
            .setThumbnail(interaction.user.avatarURL({ dynamic: true }) || "https://cdn.discordapp.com/icons/997487954626883692/a_5f604fa4cdf5a6b25571777b02575d51.gif" || null)
              .setFooter({ text: "Sistemi sıfırlamak için /log-sistem-sıfırla komudunu kullanabilirsin!" })

            return interaction.update({ embeds: [sistem_kapali], components: [] })
        
      }
    });
    
   client.on('interactionCreate', async (interaction) => {

    if(interaction.customId === "ban_log_set") {
      if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;
      
      let channel = interaction.values[0]
          wixua.set(`banLog_${interaction.guild.id}`, channel)


          let data = wixua.get(`banLog_${interaction.guild.id}`)
          if(!data) return interaction.reply({content: "Bir hata oluştu", ephemeral: true })
    
          const sistem_kapali = new EmbedBuilder()
          .setDescription("> **Ban log sistemi başarıyla ayarlandı** 🛎️")
            .setFooter({ text: "Sistemi sıfırlamak için /ban-log-sıfırla komudunu kullanabilirsin!" })


          return interaction.update({ content: "", embeds: [sistem_kapali], components: [] })
    }
  })

  client.on(Events.GuildBanAdd, async(ban) => {
    const channel = wixua.fetch(`banLog_${ban.guild.id}`)
    if(!channel) return;

    const fetchedLogs = await ban.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.MemberBanAdd,
    });

    const banLog = fetchedLogs.entries.first();
    const { executor, target } = banLog;
    
    const embed = new EmbedBuilder()
    .setColor("Red")
    .setAuthor({ name: executor.tag, iconURL: executor.avatarURL() })
    .addFields([
      {
        name: "Banlayan:",
        value: `${codeBlock("yaml", executor.tag)}`,
        inline: true
      },
      {
        name: "Banlanan:",
        value: `${codeBlock("yaml", ban.user.tag)}`,
        inline: true
      },
      {
        name: "Sebep:",
        value: `${codeBlock("yaml", (await ban.fetch()).reason.split("(")[0] ?? "Girilmemiş")}`,
      }
    ])

    client.channels.cache.get(channel).send({ embeds: [embed] })
  })

  client.on(Events.GuildBanRemove, async(ban) => {
    const channel = wixua.fetch(`banLog_${ban.guild.id}`)
    if(!channel) return;

    const fetchedLogs = await ban.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.MemberBanRemove,
    });

    const banLog = fetchedLogs.entries.first();
    const { executor, target } = banLog;
    
    const embed = new EmbedBuilder()
    .setColor("Red")
    .setAuthor({ name: executor.tag, iconURL: executor.avatarURL() })
    .addFields([
      {
        name: "Banı açan:",
        value: `${codeBlock("yaml", executor.tag)}`,
        inline: true
      },
      {
        name: "Banı açılan:",
        value: `${codeBlock("yaml", ban.user.tag)}`,
        inline: true
      },
    ])

    client.channels.cache.get(channel).send({ embeds: [embed] })
  })


  client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId === 'bankaldir') {
      if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
  
      let mal = wixua.get(`banli_${interaction.guild.id}`)
  
      let message = await interaction.channel.messages.fetch(interaction.message.id)
  
      const embed = new Discord.EmbedBuilder()
        .setDescription("**`✅` |  İşlem Başarılı**\n\n  > **Kullanıcının Başarıyla Banı Kaldırıldı!**")
        .setColor("Green")
      interaction.reply({ embeds: [embed], ephemeral: true })
      interaction.guild.members.unban(mal)
      message.delete()
    }
  })

  //BneWixua#1519 Tarafından yapıldı. Daha fazla altyapı için discord.gg/altyapilar