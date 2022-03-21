import { Client } from 'discord.js';
import { DISCORD_TOKEN, GATEWAY_INTENTS, DEVELOPMENT_MODE } from './config';
import log from './utils/logger';

const bot = new Client({ intents: GATEWAY_INTENTS });

if (DEVELOPMENT_MODE) {
  log.info('[DEV MODE] Updating slash commands for dev server.');
  updateDevCommands(bot);
}
