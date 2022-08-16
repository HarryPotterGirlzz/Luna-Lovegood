import { SlashCommand } from '../Structures';
import { findUserOrCreate } from '../Util';

export default new SlashCommand()
    .setName('subscribe')
    .setDescription('Subscribes you to daily Luna gifs in your DMs.')
    .setCallback(async interaction => {
        const collection = interaction.client.subscribers;

        const user = await findUserOrCreate(collection, interaction.user.id);

        if (user.subscribed)
            return interaction.reply({
                content: 'You are already subscribed to daily Luna gifs!',
                ephemeral: true,
            });

        await collection.updateOne(user, { $set: { subscribed: true } });

        const message = 'You are now subscribed to daily Luna gifs!\nYou will receive gifs daily at 9 AM UTC.';

        interaction.reply({ content: message, ephemeral: true });
    });
