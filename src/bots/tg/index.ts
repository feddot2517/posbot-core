import { BotInterface } from '../../@types/BotInterface';
import {Markup, Telegraf, Telegram} from 'telegraf';
import { Middleware } from '../../@types/BotTypes';
import { TelegramCtx } from './ctx';
import {UrlButtons} from "../../@types/MarkupInterface";

export class TelegramBot implements BotInterface {
    bot: Telegraf<any>;
    alias: string;

    constructor(token: string, alias: string) {
        this.bot = new Telegraf(token);
        this.alias = alias;
    }

    addMiddleware(middleware: Middleware) {
        this.bot.use((ctx, next) => middleware(new TelegramCtx(ctx, this.alias), next));
    }

    onUserStart(middleware: Middleware): void {
        this.bot.start((ctx, next) => {
            const newTelegramCtx = new TelegramCtx(ctx, this.alias);
            newTelegramCtx.startPayload = ctx.startPayload;

            middleware(newTelegramCtx, next);
        });
    }

    init() {
        return this.bot.launch();
    }

    makeUrlButtons(markup: UrlButtons[][], inline: boolean, oneTime: boolean): Markup {
        return Markup.inlineKeyboard(markup)
    }

    sendMessage(chatId: string, text: string, extra?: any) {
        return this.bot.telegram.sendMessage(chatId, text, extra && { reply_markup: extra });
    }
}
