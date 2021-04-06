/**
 * Script uses default Telegram pulling when running in development mode (determined by NODE_ENV)
 * When running in production mode, a webhook is used.
 */

import { Telegraf } from 'telegraf';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import intercept from 'azure-function-log-intercept';
import { throwIfNo } from './utils/throwIf';
import { setBotCommands } from './commands/botCommands';

require('dotenv').config();

const devMode = process.env.NODE_ENV === 'development';
const { BOT_TOKEN, WEBHOOK_ADDRESS } = process.env;

throwIfNo(BOT_TOKEN);

let bot: Telegraf;

// If in production mode, register the webhook address
if (!devMode) {
    throwIfNo(WEBHOOK_ADDRESS);
    
    bot = new Telegraf(BOT_TOKEN, { telegram: { webhookReply: true } });
    bot.telegram.setWebhook(WEBHOOK_ADDRESS);

    setBotCommands(bot);

    bot.catch((err, ctx) => { console.log(`Error for ${ctx.updateType}`, err); });
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    intercept(context);

    try {
        const rawBody = req.rawBody;

        // If in production mode, use bot.handleUpdate to handle incoming updates from Telegram
        if (!devMode) {
            if (rawBody) {
                const update = JSON.parse(rawBody);

                bot.handleUpdate(update);
            }
        // If in development mode, use the default bot.launch() to activate the pulling mechanism
        } else {
            const bot = new Telegraf(BOT_TOKEN);

            setBotCommands(bot);

            bot.launch();
        }

        // Only return a simple string to know if your bot is alive
        context.res = {
            body: JSON.stringify({
                status: 'Ready to go'
            })
        };
    } catch (error) {
        console.error('Error parsing body', error);

        context.res = {
            status: 500,
            body: { error },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};

export default httpTrigger;