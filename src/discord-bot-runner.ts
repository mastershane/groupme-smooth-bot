import { IMatchBot } from "./smooth-bot";
// import { Message } from "discord.js";

export class DiscordBotRunner {
    private _bots: IMatchBot[]
    constructor(bots: IMatchBot[]) {
      this._bots = bots;
      this.respond = this.respond.bind(this);
    }

    public respond(message: any) { // Message<boolean>
      if(message.author.bot){
        return;
      }
      const content = message.content;
      if(content) {
        for(const bot of this._bots){
          const match = bot.match(content);
          if(match.isMatch){
            message.reply(match.responseText);
            return;
          }
        }
      }
      console.log("don't care");
    }
}