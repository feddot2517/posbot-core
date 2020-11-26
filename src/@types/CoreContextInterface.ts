import { MarkupInterface, UrlButtons } from './MarkupInterface';

export interface CoreContextInterface {
    startPayload?: string;
    botAlias: string;
    user: {
        id?: number | string;
    };

    makeUrlButtons(markup: UrlButtons[][], inline: boolean, oneTime: boolean): any;
    reply(text: string, extra?: any): void;
}
