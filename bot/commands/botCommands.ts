import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';

export const setBotCommands = (bot: Telegraf<Context<Update>>) => {
    bot.command('hello', (ctx) => ctx.reply('world'));
};