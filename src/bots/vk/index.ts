import { VkBot } from 'node-vk-bot-api';
import { VkontakteCtx } from './ctx';
import { BotInterface } from '../../@types/BotInterface';
import { Middleware } from '../../@types/BotTypes';
import { VkontakteContext } from "node-vk-bot-api/lib/typings/context";
import {UrlButtons} from "../../@types/MarkupInterface";

export class VkontakteBot implements BotInterface {
    bot: VkBot;
    alias: string;

    constructor(token: string, alias: string) {
        // @ts-ignore
        this.bot = new VkBot({ token });
        this.alias = alias;
    }
    addMiddleware(middleware: Middleware) {
        this.bot.use((ctx: VkontakteContext, next: Function) => middleware(new VkontakteCtx(ctx, this.alias), next));
    }

    init() {
        return this.bot.startPolling((err: any) => {
            if (err) {
                console.log(err);
            }
        });
    }

    onUserStart(middleware: Middleware): void {
        this.bot.command(['Начать', 'Почати', 'Start'], (ctx: VkontakteContext, next: Function) => {
            const newVkCtx = new VkontakteCtx(ctx, this.alias);
            newVkCtx.startPayload = ctx.message.ref || '';

            middleware(newVkCtx, next);
        });
    }

    sendMessage(chatId: string, text: string, extra?: any) {
        return this.bot.sendMessage(chatId, text, extra);
    }

    makeUrlButtons(markup: UrlButtons[][], inline: boolean, oneTime: boolean,): any {
        return {
            keyboard: {
                buttons: markup.map((r) => (
                    r.map((c) => (
                            {
                                action: {
                                    type: 'open_link',
                                    link: c.url,
                                    label: c.text
                                }
                            }
                        )
                    ))
                ),
                one_time: oneTime,
                inline: inline,
            }
        }
    }
}
