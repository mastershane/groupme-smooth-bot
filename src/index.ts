
import  express    from 'express';
import {GroupMeMessageMatchBotRunner} from './groupme-bot-runner';
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';
import { TriggerWordsBot, SmoothBot } from './smooth-bot';
// import Discord from 'discord.js';
import { DiscordBotRunner } from './discord-bot-runner';

// For whatever reason tsc will report errors for the discord.js source code. Need to use this require to get past issue.
/* tslint:disable-next-line */
const Discord = require('discord.js') ;

dotEnv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/', (req, res) => {
  // res.writeHead(200);
  res.send("Hey, I'm Cool Guy.");
});

const bots = [new TriggerWordsBot(), new SmoothBot()];

app.post('/', new GroupMeMessageMatchBotRunner(bots).respond);

const port = Number(process.env.PORT || 5654);
app.listen(port)

const Intents = Discord.Intents;

const client = new Discord.Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', new DiscordBotRunner(bots).respond);


client.login(process.env.DISCORD_CLIENT_TOKEN);


