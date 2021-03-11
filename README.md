# posbot-core
based on telegraf.js and node-vk-bot-api chat-bot core


## examples
### core startup example
```javascript
import { PosCore } from 'posbot-core';
import { TelegramBot } from 'posbot-core';
import { VkontakteBot } from 'posbot-core';

const core = new PosCore();
const telegramBot = new TelegramBot('token', 'tg-dev-bot');
const vkontakteBot = new VkontakteBot('token', 'vk-dev-bot');

core.addBot(telegramBot);
core.addBot(vkontakteBot);

core.addMiddlewareEach((ctx, next) => {
    console.log(ctx.botAlias);
    console.log(ctx.user);

    ctx.reply('Hello, world!');
})

core.init()
```
