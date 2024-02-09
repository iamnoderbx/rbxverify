import RBXVerifyBot from "server/bot/bot.ts";

class InternalServer {
    bot: RBXVerifyBot;

    constructor() {
        this.bot = new RBXVerifyBot()
    };

    process() {
        this.bot.initalize();
    };
};

export { InternalServer }