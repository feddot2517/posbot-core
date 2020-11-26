import { Telegraf } from 'telegraf';
import { VkBot } from 'node-vk-bot-api';
import { Middleware } from './BotTypes';
import { UrlButtons } from './MarkupInterface';

export interface BotInterface {
    bot: Telegraf<any> | VkBot;
    alias: string;

    makeUrlButtons(markup: UrlButtons[][], inline: boolean, oneTime: boolean): any;
    addMiddleware(middleware: Middleware): void;
    sendMessage(chatId: string, text: string, extra?: object): Promise<any>;
    init(): any;
    onUserStart(middleware: Middleware): void;
}
