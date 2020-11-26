import { BotInterface } from './BotInterface';
import { Middleware } from './BotTypes';

export interface CoreInterface {
    bots: Array<BotInterface>;

    init(): void;
    broadcast(botAlias: string, chatIds: Array<string> | string, text: string, extra?: object): void;
    getBotByAlias(alias: String): BotInterface;
    addMiddlewareEach(middleware: Middleware): void;
    onUserStartChat(middleware: Middleware): void;
    addBot(bot: BotInterface, botAlias: string): void;
}
