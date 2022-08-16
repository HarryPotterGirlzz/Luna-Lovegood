import { EmbedBuilder } from 'discord.js';
import { SlashCommand } from '../Structures';
import { getLunaGif } from '../Util';

export default new SlashCommand()
    .setName('randomgif')
    .setDescription('Sends a random Luna gif.')
    .setCallback(async interaction => {
        const gif = await getLunaGif();

        const embed = new EmbedBuilder()
            .setTitle('Here you go ❤️')
            .setImage(gif)
            .setFooter({ text: 'Use /subscribe to receive daily Luna gifs in your DMs.' });

        interaction.reply({ embeds: [embed], ephemeral: true });
    });
