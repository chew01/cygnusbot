/* eslint-disable prefer-destructuring */
import { config } from 'dotenv';
import { resolve } from 'path';
import { Intents } from 'discord.js';

config({ path: resolve(__dirname, '../.env') });

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
if (!DISCORD_TOKEN) throw new Error('No bot token was provided!');

export const DEVELOPMENT_MODE = process.env.DEVELOPMENT ?? true;
export const DEV_GUILD_ID = process.env.DEV_GUILD_ID ? BigInt(process.env.DEV_GUILD_ID) : 0n;

export const GATEWAY_INTENTS: (keyof typeof Intents.FLAGS)[] = [
  'DIRECT_MESSAGES',
  'GUILD_MESSAGES',
];
