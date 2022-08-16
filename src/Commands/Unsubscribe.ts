import { SlashCommand } from '../Structures';
import { findUserOrCreate } from '../Util';

export default new SlashCommand()
    .setName('unsubscribe')
    .setDescription('Unsubscribes you from daily Luna gifs in your DMs.')
    .setCallback(async interaction => {
        const collection = interaction.client.subscribers;

        const user = await findUserOrCreate(collection, interaction.user.id);

        if (!user.subscribed)
            return interaction.reply({
                content: 'You are not subscribed to daily Luna gifs!',
                ephemeral: true,
            });

        await collection.updateOne(user, { $set: { subscribed: false } });

        const message = 'You are now unsubscribed from daily Luna gifs.';

        interaction.reply({ content: message, ephemeral: true });
    });
