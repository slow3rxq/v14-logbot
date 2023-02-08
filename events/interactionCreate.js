const { Collection, EmbedBuilder } = require("discord.js");
const db = require("justdata");
const { readdirSync } = require("fs");
module.exports = async(client, interaction) => {
  if(interaction.isChatInputCommand()) {

    if (!interaction.guildId) return;
    
    readdirSync('./commands').forEach(f => {
      const cmd = require(`../commands/${f}`);
    
    //BneWixua#1519 Tarafından yapıldı. Daha fazla altyapı için discord.gg/altyapilar
      if(interaction.commandName.toLowerCase() === cmd.name.toLowerCase()) {
        return cmd.run(client, interaction, db);
      }
});
}
};
