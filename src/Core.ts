import { CoreInterface } from './typings/CoreInterface';
import { BotInterface } from './typings/BotInterface';
import { Middleware } from './typings/BotTypes';

export class Core implements CoreInterface {
    bots = Array<BotInterface>();

    init(): void {
        if (!this.bots.length) {
            throw new Error('No bot has been added to the core. Add at least one');
        }

        this.bots.forEach(bot => {
            bot.init();
        });
    }

    getBotByAlias(alias: string) {
        const bot = this.bots.find(bot => bot.alias === alias);
        if (!bot) throw new Error(`Bot with alias ${alias} not found. Please check bot aliases`);

        return bot;
    }

    addBot(bot: BotInterface) {
        this.bots.push(bot);
    }

    addMiddlewareEach(middleware: Middleware) {
        this.bots.forEach(bot => bot.addMiddleware(middleware));
    }

    onUserStartChat(middleware: Middleware) {
        this.bots.forEach(bot => {
            bot.onUserStart(middleware);
        });
    }

    broadcast(botAlias: string, chatIds: Array<string>, text: string, extra?: object) {
        const bot = this.getBotByAlias(botAlias);

        chatIds.forEach(chatId => {
            bot.sendMessage(chatId, text, extra).catch(e => {
                console.error(
                    `Sending message '${text}' failed to chat with id ${chatId}. Error log:\n`,
                    e,
                );
            });
        });
    }
}
