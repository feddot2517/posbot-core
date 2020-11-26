import { CoreContextInterface } from '../../@types/CoreContextInterface';
import { VkontakteContext } from 'node-vk-bot-api/lib/typings/context';
import { ReplyExtraInterface } from '../../@types/ReplyExtraInterface';
import { UrlButtons, MarkupInterface } from '../../@types/MarkupInterface';
import { Markup, VkBotKeyboard } from 'node-vk-bot-api';

export class VkontakteCtx implements CoreContextInterface {
    private _ctx: VkontakteContext;
    startPayload?: string;
    botAlias: string;
    user: {
        id: string;
    };

    constructor(ctx: VkontakteContext, botAlias: string) {
        this._ctx = ctx;
        this.botAlias = botAlias;
        this.user = { id: ctx.message.user_id };
    }

    makeUrlButtons(markup: UrlButtons[][], inline: boolean, oneTime: boolean): any {
        return {
            keyboard: {
                buttons: markup.map(r =>
                    r.map(c => ({
                        action: {
                            type: 'open_link',
                            link: c.url,
                            label: c.text,
                        },
                    })),
                ),
                one_time: oneTime,
                inline: inline,
            },
        };
    }

    reply(text: string, extra?: any) {
        return this._ctx.reply(text, extra).catch(e => console.log(e));
    }
}
