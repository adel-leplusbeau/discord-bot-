const Discord = require("discord.js");
const ytdl = require("ytdl-core");

const Client = new Discord.Client;

const prefix = "s!";

Client.on("ready", () => {
    console.log("bot opérationnel");
});

Client.on("message", message => {
    if(message.content.startsWith(prefix + "play")){
        if(message.member.voice.channel){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");

                let dispatcher = connection.play(ytdl(args[1],{ quality: "highestaudio"}));

                dispatcher.on("finish", () => {
                    dispatcher.destroy();
                    connection.disconnect();
                });

                dispatcher.on("error", err => {
                    console.log("erreur de dispatcher : " + err)
                });
            }).catch (err => {
                message.reply("Erreur lors de la connexion : " + err);
            });

        }
        else {
            message.reply("Vous n'êtes pas connecté en vocal.");
        }
    }
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné")
            }
            else {
                if(mention.bannable) {
                    mention.ban();
                    message.channel.send(mention.displayName + " a été banni avec succès");

                }
                else {
                    message.reply("Impossible de bannir ce membre");
                }
            }
        }
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné")
        }
        else {
            if(mention.kickable){
                mention.kick();
                message.channel.send(mention.displayName + "a été kick avec succès");
            }
            else {
                message.reply("Impossible de kick ce membre");
            }
        }
    }
    else if(message.content.startsWith(prefix + "mute")) {
        let mention = message.mentions.members.first();

        if(mention == undefined){
            message.reply("Membre non ou mal mentionné");
        }
        else {
            mention.roles.add('811248341626257438');
            message.channel.send(mention.displayName + " mute avec succès."); 
        }

    }
    else if(message.content.startsWith(prefix + "unmute")) {
        let mention = message.mentions.members.first();

        if(mention == undefined) {
            message.reply("Membre non ou mal mentionné");
        }
        else {
            mention.roles.remove("811248341626257438");
            message.channel.send(mention.displayName + " a été demute avec succès ")
        }
    }
    else if(message.content.startsWith(prefix + "tempmute")) {
        let mention = message.mentions.members.first();

        if(mention == undefined) {
            message.reply("Membre non ou mal mentionné");
        }
        else {
            let args = message.content.split(" ");

            mention.roles.add("811248341626257438");
            setTimeout(function() {
                mention.roles.remove("811248341626257438");
                message.channel.send("<@" + mention.id + "> tu peux désormais parler !");

            }, args[2] * 1000);
            
        }
    }
    
}
});







Client.login(process.env.TOKEN);