import { TelegrafContext } from 'telegraf/typings/context';
import { CoreContextInterface } from '../../@types/CoreContextInterface';
import { Markup } from 'telegraf';
import { UrlButtons } from '../../@types/MarkupInterface';

export class TelegramCtx implements CoreContextInterface {
    private _ctx: TelegrafContext;
    startPayload?: string;
    botAlias: string;
    user: {
        id?: number;
    };

    constructor(ctx: TelegrafContext, botAlias: string) {
        this._ctx = ctx;
        this.botAlias = botAlias;
        this.user = { id: ctx.update.message?.from?.id };
    }

    makeUrlButtons(markup: UrlButtons[][], inline: boolean, oneTime: boolean): Markup {
        return Markup.inlineKeyboard(markup);
    }

    reply(text: string, extra?: any) {
        return this._ctx.reply(text, extra && { reply_markup: extra }).catch(e => console.log(e));
    }
}
